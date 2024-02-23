import { useState, useEffect } from "react";
import axios from "axios";

function ChatInput() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (message !== null) {
          const response = await axios.post("http://localhost:8000/input", {
            contents: message,
            type: "user",
            connectId: 1
          });
          console.log("Message sent successfully:", response.data);
        } else {
          alert("메시지를 입력하세요.");
        }
      } catch (err) {
        console.error("Error sending message:", err);
      }
    };

    //fetchData();
  }, [message]);

  const sendMessage = () => {
    if (message === "") {
      alert("메시지를 입력하세요.");
    } else {
      console.log("Sending message:", message);
      setMessage("");
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
