import React, { useState } from "react";
import "./css/Login.css";
import axios from "axios";
import Join from "./Join";

function Login({ onClose }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        userId: userId,
        password: password,
      });
      const token = response.data.token;

      {
        token !== null && alert("로그인 성공");
      }

      console.log(token);
    } catch (error) {
      alert("로그인 실패");
      console.error("로그인 오류:", error);
    }
  };

  const onchangelogin = (e) => {
    setUserId(e.target.value);
  };

  const onchangepassword = (e) => {
    setPassword(e.target.value);
  };

  const sendUser = () => {
    fetchData();
  };

  return (
    <>
      <div className="login-bg">
        <div className="login">
          <div className="login-container">
            <p>로그인</p>
            <div className="login-container input">
              <input
                type="text"
                onChange={onchangelogin}
                placeholder=" 로그인하세요"
              />
              <input
                type="password"
                onChange={onchangepassword}
                placeholder=" 비밀번호 입력"
              />
            </div>
            <div className="login-show-btn">
              <button className="login-on" onClick={sendUser}>
                로그인
              </button>
              <button className="login-off" onClick={onClose}>
                로그인 닫기
              </button>
            </div>
            <div className="join-select">
              <p>회원가입</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
