import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPerson } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ChatInput from "../Components/ChatInput";
import ChatBubble from "../Components/ChatBubble";
import "../main.css";

function Home(props) {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [chatData, setChatData] = useState([]);
  const navigate = useNavigate();
  const dataUrl = window.location.href.slice(-1);

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

  const fetchDeleteLoginData = async () => {
    try {
      await axios.get("http://localhost:8000/logout");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChatData = async (selectedId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/chat/${selectedId}`
      );
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
      await axios.post(`http://localhost:8000/delete/${dataUrl}`);
      console.log("채팅 삭제");
      setChatData([]);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const LogoutEvent = () => {
    localStorage.removeItem("accessToken");
    fetchDeleteLoginData();
  };

  return (
    <>
      <div className="containers">
        <div className="container">
          <div className="list">
            <div className="list-logo"></div>
            <div className="list-item">
              {data.map((currentData) => (
                <div
                  className="list-box"
                  key={currentData.id}
                  onClick={() => {
                    setSelectedId(currentData.id);
                  }}
                >
                  <div className="list-box-icon">
                    <FaPerson icon="true" size={30} />
                  </div>

                  <div
                    className="list-box-item"
                    key={currentData.id}
                    onClick={() => {
                      navigate(`/${currentData.id}`);
                    }}
                  >
                    <p>Name: {currentData.name}</p>
                    <p>Content: {currentData.content}</p>
                    <p>Location: {currentData.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="list-login">
              <div className="login">
                <button
                  className="Login-btn"
                  type="submit"
                  onClick={LogoutEvent}
                >
                  <p>userName : </p>
                </button>
              </div>
            </div>
          </div>
          <div className="chat-board">
            <div className="chat-item-top">
              <button type="submit" onClick={deleteChat}>
                채팅 나가기
              </button>
            </div>
            <div className="chat-main">
              {selectedId !== -1 && (
                <div className="chat-bg">
                  {chatData
                    .filter((message) => message.connectId === selectedId)
                    .map((message, index) => (
                      <div key={index}>
                        <ChatBubble
                          id={message.connectId}
                          type={message.type === "user" ? "user" : "bot"}
                          content={message.contents}
                        />
                      </div>
                    ))}
                </div>
              )}

              <div className="chat-msg">
                <ChatInput
                  setChatData={(message) =>
                    setChatData(
                      chatData.concat({
                        id: "",
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

      {/* {showLoginModal && <Login onClose={closeModal} onLogin={loginUser} />} */}
    </>
  );
}

export default Home;
