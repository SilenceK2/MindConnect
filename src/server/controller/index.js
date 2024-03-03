const db = require("../models/index");
const { sequelize } = require("../models/index");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const login = (req, res) => {
  const { userEmail, password } = req.body;
  const userInfo = db.member.findOne({
    where: {
      email: userEmail,
      password: password,
    },
  });

  if (!userInfo) {
    res.status(401).json({ message: "인증 실패" });
  } else {
    try {
      const accessToken = jwt.sign(
        {
          //   id: userInfo.id,
          //   email: userInfo.email,
          userInfo,
          //   name: userInfo.name,
        },
        "access-token",
        {
          expiresIn: "1m",
          issuer: "myserver",
        }
      );
      const refreshToken = jwt.sign(
        {
          //   id: userInfo.id,
          userInfo,
        },
        "refresh-token",
        {
          expiresIn: "24h",
          issuer: "myserver",
        }
      );

      res.json({ accessToken });

      //쿠키값에 토큰 태워보냄
      res.cookie("access-token", accessToken, {
        secure: false,
        httponly: true,
      });
      res.cookie("refresh-token", refreshToken, {
        secure: false,
        httponly: true,
      });

      res.status(200).json("login-succuess");
    } catch (error) {
      res.status(500).json(error);
    }
  }
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
};
