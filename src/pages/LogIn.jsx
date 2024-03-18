import React, { useState } from "react";
import "./css/Login.css";
import { Logins, verify } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { userState } from "../recoil/atom";
import { useRecoilState } from "recoil";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const sendUser = async () => {
    const result = await Logins(userEmail, password);
    const member = await verify();

    if (result.success) {
      alert("로그인 성공");
      // window.location.href = "/home";
      // window.location.reload();
      navigate("/home");
      setUser(member.user.email);
    } else {
      alert(`로그인 실패: ${result.error}`);
    }
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
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder=" email"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" 비밀번호 입력"
              />
            </div>
            <div className="login-show-btn">
              <button className="login-on" onClick={sendUser}>
                로그인
              </button>
            </div>
            <div
              className="join-select"
              onClick={() => {
                navigate(`/join`);
              }}
            >
              <p>회원가입</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
