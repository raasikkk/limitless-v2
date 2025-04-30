import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();

  const messages = [
    { id: 1, text: "Hey, how are you?", sender: "them", timestamp: "10:30 AM" },
    { id: 2, text: "I'm good, thanks!", sender: "me", timestamp: "10:31 AM" },
  ];

  return (
    <div className="flex-1 flex flex-col dark:bg-darkColor">

      <div className="p-4 border-b dark:border-darkSecondary bg-white dark:bg-darkSecondary">
        <h2 className="text-xl font-semibold dark:text-white">Chat {id}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-darkSecondary dark:text-white"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t dark:border-darkSecondary bg-white dark:bg-darkSecondary">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full dark:bg-darkColor dark:border-darkSecondary dark:text-white focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;