const verifyToken = async (accessToken) => {
  try {
    const response = await fetch("http://localhost:8000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    });

    console.log(accessToken);

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      console.error("Authentication error:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
};

export default verifyToken;
