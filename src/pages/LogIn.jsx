import React, { useState } from "react";
import "./css/Login.css";
import axios from "axios";
import { Outlet } from "react-router";
import { useRecoilState } from "recoil";
import { userDataState } from "../recoil/atom";
import verifyToken from "../utils/auth";

function Login({}) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setUserData] = useRecoilState(userDataState);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          userEmail: userEmail,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      const token = response.data.accessToken;

      // const tokenString = JSON.stringify(token);
      localStorage.setItem("accessToken", token);
      const user = await verifyToken(token);
      if (user) {
        setUserData(user);
        alert("로그인 성공");
        window.location.href = "/";
        window.location.reload();
        console.log(setUserData);
      }

      console.log(token);
    } catch (error) {
      alert("로그인 실패");
      console.error("로그인 오류:", error);
    }
  };

  const onchangelogin = (e) => {
    setUserEmail(e.target.value);
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
                placeholder=" email"
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
              {/* <button className="login-off" onClick={onClose}>
                로그인 닫기
              </button> */}
            </div>
            <div className="join-select">
              <p>회원가입</p>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Login;
