import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atom";

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchJoinData = () => {
      const respose = axios.post("http://localhost:8000/join", {
        userEmail: email,
        userPW: password,
      });
    };
    fetchJoinData();
  }, []);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <div className="join-bg">
        <div className="join">
          <div className="join-container">
            <div className="join-container input">
              <input type="text" placeholder=" email" onChange={changeEmail} />
              <input type="password" placeholder=" 비밀번호 입력" />
              <input
                type="password"
                placeholder=" 비밀번호 재입력"
                onChange={changePassword}
              />
            </div>
            <div className="login-show-btn">
              <button className="login-on">회원가입</button>
            </div>
            <div className="join-select"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
