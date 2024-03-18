import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatInput from "../Components/ChatInput";
import ChatBubble from "../Components/ChatBubble";
import "../main.css";
import { userState } from "../recoil/atom";
import { useRecoilValue } from "recoil";
import ConnecterList from "../Components/ConnecterList";

function Home() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [chatData, setChatData] = useState([]);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/connecter");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const fetchChatData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/chat/${id}`);
      setChatData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedId !== -1) {
      fetchChatData(selectedId);
    }
  }, [selectedId]);

  const deleteChat = async () => {
    try {
      await axios.delete(`http://localhost:8000/chat/${selectedId}`);
      setChatData([]);
    } catch (error) {
      console.error(error);
    }
  };

  const LogoutEvent = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="containers">
      <div className="container">
        <div className="list">
          <ConnecterList
            data={data}
            setSelectedId={setSelectedId}
            navigate={navigate}
          />
          <div className="list-login">
            <button className="Login-btn" onClick={LogoutEvent}>
              <p>{user}</p>
            </button>
          </div>
        </div>
        <div className="chat-board">
          <div className="chat-item-top">
            <button onClick={deleteChat}>채팅 나가기</button>
          </div>
          <div className="chat-main">
            {selectedId !== -1 && (
              <div className="chat-bg">
                {chatData.map((message, index) => (
                  <ChatBubble key={index} {...message} />
                ))}
              </div>
            )}
            <div className="chat-msg">
              <ChatInput
                setChatData={(message) =>
                  setChatData(
                    chatData.concat({
                      connectId: selectedId,
                      contents: message,
                      type: "user",
                    })
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
