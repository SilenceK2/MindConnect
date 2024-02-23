const mysql = require('mysql');


const db = mysql.createPool({
    host: "127.0.0.1", // 호스트
    user: "root",      // 데이터베이스 계정
    password: "1234",      // 데이터베이스 비밀번호
    database: "mindapp",  // 사용할 데이터베이스
});
