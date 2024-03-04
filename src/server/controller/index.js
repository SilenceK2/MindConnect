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
    redisClient.connect();
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

    redisClient.set(userEmail, refreshToken, (err, reply) => {
      if (err) throw err;
      console.log(reply);
    });

    // 쿠키값에 토큰 태워보냄
    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
    });
    res.status(200).json({ accessToken, message: "login-success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

const testCookie = (req, res) => {
  res.cookie("testCookie", "안녕하세요, 쿠키!", {
    secure: false,
    httpOnly: true,
  });

  res.status(200).json({ message: "테스트 쿠키가 성공적으로 설정되었습니다." });
};

const accessToken = (req, res) => {};
const refreshToken = (req, res) => {};
const loginSuccess = (req, res) => {};
const logout = (req, res) => {};

module.exports = {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logout,
  testCookie,
};
