const db = require("../models/index");
const jwt = require("jsonwebtoken");
const Redis = require("redis");
const bcrypt = require("bcrypt");
const member = require("../models/member");
const saltRounds = 10;
const redisClient = Redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  legacyMode: true,
});

const login = async (req, res) => {
  try {
    await redisClient.connect();
    const { userEmail, password } = req.body;
    const user = await db.member.findOne({
      password,
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    const userInfo = await db.member.findOne({
      where: {
        email: userEmail,
        password: passwordMatch,
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
      expiresIn: "10m",
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
        expiresIn: "1h",
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
      email: decoded.email,
      name: decoded.name,
    };
    res.status(200).json({ success: true, user }); // auth로 success : true보냄 ( router 사용할때 써먹을 것 )
    console.log(user);
  });
};

const join = async (req, res) => {
  try {
    const { joinEmail, joinPwd, joinName } = req.body;

    // 비밀번호 해시 처리
    const hashedPassword = await bcrypt.hash(joinPwd, saltRounds);
    const newUser = await db.member.create({
      email: joinEmail,
      password: hashedPassword,
      name: joinName,
      type: "connector",
    });

    // 회원가입 성공 응답
    res.status(200).json({ success: true, message: "회원 가입 성공" });
  } catch (error) {
    // 이메일이 이미 있을경우(유니크제약?)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ success: false, message: "이미 사용중인 이메일입니다." });
    }

    console.error("Join error:", error);
    res.status(500).json({
      success: false,
      message: "회원 가입 실패",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {};

module.exports = {
  join,
  login,
  checking,
  logout,
};
