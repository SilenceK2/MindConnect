const express = require("express");
const db = require("./models/index");
const { sequelize } = require("./models/index");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);
const {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logout,
} = require("./controller");
const { verify } = require("jsonwebtoken");
// const secretKey = "my-secret-key";

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결 성공");

    app.get("/", (req, res) => {
      // jwt헤더 설정
      res.send("루트 경로");
    });

    app.get("/connecter", async (req, res) => {
      // jwt헤더 설정

      const connect = await db.connecter.findAll();
      return res.json(connect);
    });

    app.get("/chat/:id", async (req, res) => {
      const ids = req.params.id;
      const chat = await db.chat.findAll({
        connectId: ids,
      });
      return res.json(chat);
    });

    app.post("/input", async (req, res) => {
      const { connectId, contents, type } = req.body;
      const input = await db.chat.create({
        connectId: connectId,
        contents: contents,
        type: type,
      });

      return res.json(input);
    });

    app.post("/delete/:id", async (req, res) => {
      const ids = req.params.id;
      const chatDelete = await db.chat.destroy({
        where: {
          connectId: ids,
        },
      });

      return res.json(chatDelete);
    });

    app.post("/login", login);
    app.post("/verify", verify);
    app.get("/login/succes", loginSuccess);
    app.post("/logout", logout);

    app.listen(PORT, () => console.log(`서버 시작`));
  })
  .catch((err) => console.error("데이터베이스 연결 중 오류 발생", err));
