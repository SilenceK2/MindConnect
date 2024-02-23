import React from "react";
import ChatInput from "../Components/ChatInput";
import ChatBubble from "../Components/ChatBubble";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPerson } from "react-icons/fa6";
import "../main.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [ids, setIds] = useState([]);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [chatData, setChatData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/connecter");
        setData(response.data);
        const ConnectId = response.data.map((item) => item.id);
        setIds(ConnectId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/chat");
        setChatData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="containers">
        <div className="container">
          <div className="list">
            <div className="list-logo"></div>
            <div className="list-item">
              {ids.map((id) => {
                const currentData = data.find((item) => item.id === id);
                return (
                  <div
                    className="list-box"
                    key={id}
                    onClick={() => {
                      setSelectedId(id);
                    }}
                  >
                    <div className="list-box-icon">
                      <FaPerson icon="true" size={30} />
                    </div>

                    <div
                      className="list-box-item"
                      key={id}
                      onClick={() => {
                        navigate(`/${id}`);
                      }}
                    >
                      <p>Name: {currentData.name}</p>
                      <p>Content: {currentData.content}</p>
                      <p>Location: {currentData.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="list-login">
              <div className="login">
                <button className="Login-btn" type="submit">
                  <p>Login</p>
                </button>
              </div>
            </div>
          </div>
          <div className="chat-board">
            <div className="chat-item-top"><button type="submit">채팅 나가기</button></div>
            <div className="chat-main">
              {selectedId !== -1 && (
                <div className="chat-bg">
                  {chatData
                    .filter((message) => message.connectId === selectedId)
                    .map((message) => (
                      <div>

                        {message.type === "user" ? (
                          <ChatBubble
                            id={message.connectId}
                            type="user"
                            content={message.contents}
                          />
                        ) : (
                          
                          <ChatBubble
                            id={message.connectId}
                            type="bot"
                            content={message.contents}
                          />
                          
                        )}
                      </div>
                    ))}
                </div>
              )}

              <div className="chat-msg">
                <ChatInput />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
