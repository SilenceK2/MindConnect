import { useState, useEffect } from "react";
import axios from "axios";

function ChatInput() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("Sending message:", message);
    setMessage("");
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
