import { FC } from 'react';
import { Home, User, Menu, Trophy, Settings, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isMobile: boolean;
  isTablet: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const links = [
    { label: 'Home', url: "/", icon: <Home size={20} /> },
    { label: 'Competitions', url: "/", icon: <Trophy size={20} /> },
    { label: 'Profile', url: "/", icon: <User size={20} /> },
    { label: 'Settings', url: "/", icon: <Settings size={20} /> },
]

// const isLoggedin = true

const Sidebar: FC<SidebarProps> = ({ isMobile, isSidebarOpen, toggleSidebar }) => {
  return (
    <aside className={`
      fixed top-0 left-0 h-screen z-50 bg-white border-r-2 text-black 
      transition-all duration-100 overflow-hidden
      ${isMobile ? `
        w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      ` : `
        ${isSidebarOpen ? 'w-64' : 'w-16'}
      `}
    `}>
      <div className="p-4 border-b border-gray-200 h-16 flex items-center">
          <button
            onClick={toggleSidebar}
            className={`hover:text-gray-600 transition-colors ${
              !isSidebarOpen ? 'mx-auto' : ''
            }`}
          >
            <Menu size={24} />
          </button>
      </div>
      
      <nav className="p-2">
        <ul className="space-y-2 pt-3">
            <Link
                to="/"
                className={`${!isSidebarOpen ? "p-1" : "p-1.5 px-4"} border-2 shadow-md flex items-center max-w-36 gap-2 text-[#20beff] rounded-full hover:scale-105 transition`}
            >
                <Plus color="#20beff" size={35} strokeWidth={2.25} />
                <span 
                    className={`text-lg font-semibold ${!isSidebarOpen ? 'hidden' : 'block'}`}
                >
                    Create
                </span>
            </Link>

            {links.map((item) => (
                <Link
                    key={item.label}
                    to={item.url}
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-100
                    ${!isSidebarOpen && !isMobile ? 'justify-center' : 'px-4'}`}
                >
                    {item.icon}
                    {(isSidebarOpen || isMobile) && (
                    <span className={`ml-3 ${!isSidebarOpen ? 'hidden' : 'block'}`}>
                        {item.label}
                    </span>
                    )}
                </Link>
            ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar