import axios from "axios";

const Logins = async (userEmail, password) => {
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
    if (token !== null) {
      localStorage.setItem("accessToken", token);
      return { success: true, token };
    } else {
      console.error("Invalid token");
      return { success: false, error: "Invalid token" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed" };
  }
};

const verify = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return { success: false, error: "토큰없음" };
    }

    const response = await axios.post(
      "http://localhost:8000/checking",
      { accessToken: accessToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const user = response.data.user;

    if (response.data.success) {
      return { success: true, user };
    } else {
      return { success: false, error: response.data.error };
    }
  } catch (error) {
    console.error("인증실패:", error);
    return { success: false, error: "인증실패" };
  }
};

const Joins = async (email, password, name) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/join",
      {
        joinEmail: email,
        joinPwd: password,
        joinName: name,
      },
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("회원가입 실패:", error);
    return { success: false, error: "회원가입 실패" };
  }
};

const Logout = async () => {
  try {
    const response = await axios.post("http://localhost:8000/logout");
  } catch {}
};

export { Logins, verify, Joins };
