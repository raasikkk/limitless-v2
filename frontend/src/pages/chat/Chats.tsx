// Chats.tsx
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const colorTheme = localStorage.getItem("theme");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial chats
    console.log("Chats fetching");
    const fetchChats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/chats/1/getmessages"
        );
        const data = await response.json();
        setChats(data.content);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
    console.log("Chats fetched");
  }, []);

  useEffect(() => {
    if (colorTheme) {
      document.body.classList.add(colorTheme);
    }
  }, [colorTheme]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-darkColor">
      <div className="w-1/3 border-r dark:border-darkSecondary bg-white dark:bg-darkColor">
        <div className="p-4 bg-blue-50 dark:bg-darkSecondary">
          <Link to={`/`} className="ml-3 flex items-center gap-2">
            <p className="font-bold">Limitless</p>
            <img src="/logo.svg" className="size-10" alt="logo" />
          </Link>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          {chats.map((chat) => (
            <div
              key={chat.message_id}
              onClick={() => navigate(`/chats/${chat.id}`)}
              className="p-4 border-b dark:border-darkSecondary hover:bg-gray-50 dark:hover:bg-darkSecondary cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/ava.jpg"
                  className="rounded-full size-10"
                  alt="profile"
                />
                <div className="flex justify-between items-center">
                  <h3 className="font-medium dark:text-white">Chat</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default Chats;
