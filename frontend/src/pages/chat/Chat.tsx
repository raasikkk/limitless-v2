import { useAppSelector } from "@/hooks/hooks";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const { chat_id } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAppSelector((state) => state.user);

  const sendMessage = async () => {
    if (messageInput !== "") {
      const messageData = {
        room: chat_id,
        author_id: user?.id,
        message: messageInput,
      };

      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    console.log("Chats fetching");
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/chats/${chat_id}/getmessages`
        );
        const data = await response.json();
        setMessages(data.content);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
    console.log("Chats fetched");
  }, [messages]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="flex-1 flex flex-col dark:bg-darkColor">
      <div className="p-4 border-b dark:border-darkSecondary bg-white dark:bg-darkSecondary">
        <h2 className="text-xl font-semibold dark:text-white">
          Chat {chat_id}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.message_id}
            className={`flex ${
              message.author_id === user?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg bg-gray-200 dark:bg-darkSecondary dark:text-white`}
            >
              <p>
                {message.author_id}: {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t dark:border-darkSecondary bg-white dark:bg-darkSecondary">
        <div className="flex space-x-4">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full dark:bg-darkColor dark:border-darkSecondary dark:text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
