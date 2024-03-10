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
      } else {
        // res.status(200).json({ accessToken, message: "login-success" });
      }
    });

    redisClient.set(userEmail, refreshToken);

    res.status(200).json({ accessToken, message: "login-success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

const verify = (req, res) => {
  const { accessToken } = req.body;
  console.log(accessToken);

  if (!accessToken) {
    return res.status(400).json({ error: "Access token not provided" });
  }

  // 토큰 검증
  jwt.verify(accessToken, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid access token" });
    }

    // 유효한 경우, 필요한 사용자 정보를 전송
    const user = {
      email: decoded.email,
      name: decoded.name,
    };

    res.status(200).json(user);
  });
};
const refreshToken = (req, res) => {};
const loginSuccess = (req, res) => {};
const logout = async (req, res) => {};

module.exports = {
  login,
  verify,
  refreshToken,
  loginSuccess,
  logout,
};
