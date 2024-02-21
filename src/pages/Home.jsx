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
        const response = await axios.get("http://localhost:4000/data");
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
        const response = await axios.get("http://localhost:4000/chat");
        setChatData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(chatData);

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
                      <FaPerson icon size={30} />
                    </div>

                    <div
                      className="list-box-item"
                      key={id}
                      onClick={() => {
                        navigate(`/${id}`);
                      }}
                    >
                      <h3>Name: {currentData.name}</h3>
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
            <div className="chat-item-top"></div>
            <div className="chat-main">
              {selectedId !== -1 && (
                <div className="chat-bg">
                  {chatData
                    .filter((message) => message.connectid === selectedId)
                    .map((message) => (
                      <div>
                        {message.type === "user" ? (
                          <ChatBubble
                            id={message.connectid}
                            type="user"
                            content={message.contents}
                          />
                        ) : (
                          <ChatBubble
                            id={message.connectid}
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
