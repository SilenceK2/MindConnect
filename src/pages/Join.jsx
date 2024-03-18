import axios from "axios";
import { useEffect, useState } from "react";
import { Joins } from "../utils/auth";
import { useNavigate } from "react-router";

const Join = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendUser = async () => {
    const result = await Joins(email, password, name);

    if (result.success) {
      alert("회원가입 성공");
      navigate("/login");
      window.location.reload();
    } else {
      alert(`회원가입 실패: ${result.error}`);
    }
  };
  return (
    <>
      <div className="login-bg">
        <div className="login">
          <div className="login-container">
            <div className="join-container input">
              <input
                type="text"
                placeholder=" 이름을 입력하세요"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder=" email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="password" placeholder=" 비밀번호 입력" />
              <input
                type="password"
                placeholder=" 비밀번호 재입력"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-show-btn">
              <button className="login-on" onClick={sendUser}>
                회원가입
              </button>
            </div>
            <div className="join-select"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
