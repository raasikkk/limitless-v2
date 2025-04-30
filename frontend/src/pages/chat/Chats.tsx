// Chats.tsx
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Chats = () => {
  const colorTheme = localStorage.getItem("theme");
  const navigate = useNavigate();

  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", timestamp: "10:30 AM", unread: 2 },
    { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!", timestamp: "9:45 AM", unread: 0 },
  ];

  useEffect(() => {
    if (colorTheme) {
      document.body.classList.add(colorTheme);
    }
  }, [colorTheme]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-darkColor">

      <div className="w-1/3 border-r dark:border-darkSecondary bg-white dark:bg-darkColor">
        <div className="p-4 bg-blue-50 dark:bg-darkSecondary">
            <Link to={`/`} className='ml-3 flex items-center gap-2'>
                <p className='font-bold'>Limitless</p>
                <img src="/logo.svg" className='size-10' alt="logo" />
            </Link>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => navigate(`/chats/${chat.id}`)}
              className="p-4 border-b dark:border-darkSecondary hover:bg-gray-50 dark:hover:bg-darkSecondary cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <img src="/ava.jpg" className="rounded-full size-10" alt="profile" />
                <div className="flex justify-between items-center">
                    <h3 className="font-medium dark:text-white">{chat.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{chat.timestamp}</span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-gray-600 dark:text-gray-300 text-end truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                    {chat.unread}
                  </span>
                )}
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