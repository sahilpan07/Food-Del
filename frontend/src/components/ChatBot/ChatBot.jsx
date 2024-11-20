import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [showWelcomeDiv, setShowWelcomeDiv] = useState(true);

  const helpOptions = [
    "Order Status",
    "Refund",
    "Delivery Time",
    "Payment Issue",
    "Account Problem",
  ];

  const chatbotRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIssueClick = async (issue) => {
    setChatHistory([...chatHistory, { sender: "user", text: issue }]);
    setIsBotTyping(true);
    try {
      const response = await axios.post("http://localhost:4000/api/chatbot", {
        message: issue,
      });
      const botResponse = response.data.response;

      setTimeout(() => {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: "bot", text: botResponse },
        ]);
        setIsBotTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsBotTyping(false);
    }
  };

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowWelcomeDiv(true);
    }
  };

  const startChat = () => {
    setIsChatStarted(true);
    setShowWelcomeDiv(false);
    setChatHistory([
      { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);
  };

  return (
    <div className="relative z-50  ">
      <button
        onClick={toggleChatWindow}
        className="animate-pulse fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl active:scale-100 active:shadow-md"
      >
        <Icon icon="eva:message-circle-fill" className="text-4xl" />
      </button>

      {isOpen && (
        <div
          ref={chatbotRef}
          className={`fixed bottom-24 right-6 w-96 max-w-full h-3/4 bg-white shadow-xl rounded-lg flex flex-col transition-all duration-500 ease-in-out ${
            isChatStarted ? "p-4" : ""
          }`}
        >
          {showWelcomeDiv && !isChatStarted && (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-[#040A27] via-[#040A27] to-white p-8 rounded-lg shadow-xl space-y-6">
              <h2 className="text-3xl font-extrabold text-white text-center mb-4">
                Welcome to Our Chatbot!
              </h2>
              <p className="text-sm text-white text-center mb-6 px-4 sm:px-8 md:px-16">
                Our chatbot is here to assist you with any queries you might
                have. Whether it's tracking orders, refunds, or payment issues,
                we're ready to help!
              </p>

              <button
                onClick={startChat}
                className="px-6 py-3 text-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-green-500 shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                Chat with Us
              </button>

              <div className="flex justify-center mt-4 space-x-4">
                <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
              </div>
            </div>
          )}

          {isChatStarted && (
            <>
              <div className="flex-grow text-sm h-64 overflow-y-auto p-4 space-y-4 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`my-2 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      <strong>{msg.sender === "user" ? "You" : "Bot"}: </strong>{" "}
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isBotTyping && (
                  <div className="text-left text-gray-600">
                    <span className="inline-block px-4 py-2 bg-gray-300 text-white rounded-lg">
                      <strong>Bot: </strong> Typing...
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {helpOptions.map((issue, index) => (
                  <button
                    key={index}
                    onClick={() => handleIssueClick(issue)}
                    className="p-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
