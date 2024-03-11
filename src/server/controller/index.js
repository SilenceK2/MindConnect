const db = require("../models/index");
const jwt = require("jsonwebtoken");
const Redis = require("redis");
const redisClient = Redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  legacyMode: true,
});

const login = async (req, res) => {
  try {
    await redisClient.connect();
    const { userEmail, password } = req.body;
    const userInfo = await db.member.findOne({
      where: {
        email: userEmail,
        password: password,
      },
    });

    if (!userInfo) {
      return res.status(401).json({ message: "인증 실패" });
    }

    const userData = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
    };

    const accessToken = jwt.sign(userData, "my-secret-key", {
      expiresIn: "1m",
      issuer: "myserver",
    });

    const refreshToken = jwt.sign(
      {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
      },
      "my-secret-key",
      {
        expiresIn: "24h",
        issuer: "myserver",
      }
    );

    redisClient.set(userEmail, refreshToken, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Redis 연결 오류" });
      }
    });

    res.status(200).json({ accessToken, message: "login-success", userEmail });
    // redisClient.quit();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

const checking = (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "토큰이 없습니다.!" });
  }

  jwt.verify(accessToken, "my-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "accesstoken 없음" });
    }

    const user = {
      //user에 담긴거 recoil로 상태관리 보내기??
      email: decoded.email,
      name: decoded.name,
    };
    res.status(200).json({ success: true, user }); // auth로 success : true보냄 ( router 사용할때 써먹을 것 )
  });
};

const join = async (req, res) => {};

const logout = async (req, res) => {};

module.exports = {
  join,
  login,
  checking,
  logout,
};
