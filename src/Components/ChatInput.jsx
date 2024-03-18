import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useEffect } from "react";

function ChatInput(props) {
  const [message, setMessage] = useState("");
  const dataUrl = window.location.href.slice(-1);
  const socket = io("http://localhost:8000", {
    cors: "*",
    withCredentials: true,
  });

  useEffect(() => {
    socket.emit("connection");
    socket.on("room", (msg) => {
      console.log(msg);
    });
  }, [props.setChatData]);

  const fetchData = async () => {
    try {
      if (message.trim() !== "") {
        const response = await axios.post("http://localhost:8000/input", {
          contents: message,
          type: "user",
          connectId: dataUrl,
        });
        console.log("메시지 전송 성공:", response.data);
        props.setChatData(message);
      } else {
        alert("메시지를 입력하세요.");
      }
    } catch (err) {
      console.error("메시지 전송 중 오류:", err);
    }
  };

  const sendMessage = () => {
    if (message === "") {
      alert("메시지를 입력하세요.");
    } else {
      console.log("메시지 전송 중:", message);

      setMessage("");
      fetchData();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default ChatInput;
