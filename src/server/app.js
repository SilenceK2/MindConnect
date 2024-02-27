const express = require('express')
const db = require('./models/index')
const { sequelize } = require('./models/index')
const cors = require('cors')
const app = express()

app.use(express.json())



sequelize
  .sync()
  .then(() => {
    console.log('connected database');
    

    app.get("/", (req, res)=> {
        res.header("Access-Control-Allow-Origin", "*");
        res.send("root path");
    });


    app.get("/connecter", async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const connect = await db.connecter.findAll();
        return res.json(connect);

    })

    app.get("/chat", async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const chat = await db.chat.findAll();
        return res.json(chat);
    })

    app.options('/input', cors({ origin: '*' }));

    app.post("/input", async(req, res) => {
        
        res.header("Access-Control-Allow-Origin", "*");

        const {connectId, contents, type} = req.body;
        const input = await db.chat.create({
            connectId : connectId,
            contents : contents,
            type : type
        });
        return res.json(input);
    })

    app.post("/delete/:id", async (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");

        const ids = req.params.id;
        const chatDelete = await db.chat.destroy({
            where : {
                id : ids
            }
        })
        return res.json(chatDelete);
    })

    


    
    
    app.listen(8000, () => console.log(`서버시작`))
  })
  .catch(err => console.error('occurred error in database connecting', err));

