import { useState } from "react";
import { Joins } from "../utils/auth";
import { useNavigate } from "react-router";

const Join = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const sendUser = async () => {
    const { name, email, password, confirmPassword } = userInfo;

    // 입력 값 검증
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const result = await Joins(email, password, name);
      if (result.success) {
        alert("회원가입 성공");
        navigate("/login");
        window.location.reload();
      } else {
        throw result;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("존재하는 이메일입니다.");
        return;
      } else {
        alert(`회원가입 실패: ${error.message}`);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="login-bg">
        <div className="login">
          <div className="login-container">
            <div className="join-container input">
              <input
                type="text"
                name="name"
                placeholder=" 이름을 입력하세요"
                onChange={handleChange}
                value={userInfo.name}
              />
              <input
                type="text"
                name="email"
                placeholder=" email"
                onChange={handleChange}
                value={userInfo.email}
              />
              <input
                type="password"
                name="password"
                placeholder=" 비밀번호 입력"
                onChange={handleChange}
                value={userInfo.password}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder=" 비밀번호 재입력"
                onChange={handleChange}
                value={userInfo.confirmPassword}
              />
            </div>
            <div className="login-show-btn">
              <button className="login-on" onClick={sendUser}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
