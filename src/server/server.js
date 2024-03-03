const express = require("express");
const db = require("./models/index");
// const jwt = require("jsonwebtoken");
const { sequelize } = require("./models/index");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
const http = require("http");
// const { json } = require("sequelize");
// const { Server } = require("socket.io");
const server = http.createServer(app);
const {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logout,
} = require("./controller");

app.use(express.json());
app.use(cors()); // sen설정해두기

sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결 성공");

    app.get("/", (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send("루트 경로");
    });

    app.get("/connecter", async (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      const connect = await db.connecter.findAll();
      return res.json(connect);
    });

    app.get("/chat/:id", async (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      const ids = req.params.id;
      const chat = await db.chat.findAll({
        connectId: ids,
      });
      return res.json(chat);
    });

    app.options("/input", cors({ origin: "*" }));

    app.post("/input", async (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");

      const { connectId, contents, type } = req.body;
      const input = await db.chat.create({
        connectId: connectId,
        contents: contents,
        type: type,
      });

      // io.to(connectId).emit("chat", input);

      return res.json(input);
    });

    app.post("/delete/:id", async (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");

      const ids = req.params.id;
      const chatDelete = await db.chat.destroy({
        where: {
          connectId: ids,
        },
      });

      return res.json(chatDelete);
    });

    // jwt  section

    // app.post("/login", async (req, res) => {
    //   res.header("Access-Control-Allow-Origin", "*");

    //   try {
    //     const { userId, password } = req.body;
    //     const member = await db.member.findOne({
    //       where: {
    //         id: userId,
    //         password: password,
    //       },
    //     });

    //     if (member) {
    //       const Accesstoken = jwt.sign({ userId }, "key", {
    //         expiresIn: "12h",
    //       });
    //       res.json({ Accesstoken });
    //     } else {
    //       res.status(401).json({ message: "인증 실패" });
    //     }
    //   } catch (error) {
    //     console.error("로그인 중 오류:", error);
    //     res.status(500).json({ message: "서버 오류" });
    //   }
    // });

    app.post("/login", login);
    app.get("/accesstoken", accessToken);
    app.get("/refreshtoken", refreshToken);
    app.get("/login/succes", loginSuccess);
    app.post("/logout", logout);

    //
    //
    //
    //

    server.listen(PORT, () => console.log(`서버 시작`));
  })
  .catch((err) => console.error("데이터베이스 연결 중 오류 발생", err));

module.exports = server.js;
