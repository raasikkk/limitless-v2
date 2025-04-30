import { FC } from 'react';
import { Home, User, Menu, Trophy, Settings, Plus, Calendar, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/hooks';


interface SidebarProps {
  isMobile: boolean;
  isTablet: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}


// const isLoggedin = true

const Sidebar: FC<SidebarProps> = ({ isMobile, isSidebarOpen, toggleSidebar }) => {
  const { t } = useTranslation()
  const {user} = useAppSelector((state)=>state.user);

  const links = [
    { label: t('home'), url: "/", icon: <Home size={20} /> },
    { label: t('competitions'), url: "/competitions", icon: <Trophy size={20} /> },
    { label: t('organization'), url: "/organizations", icon: <Building2 size={20} /> },
    { label: t("schedule"), url: "/schedule", icon: <Calendar size={20} /> },
    { label: t('profile'), url: `/profile/${user?.id}`, icon: <User size={20} /> },
    { label: t('settings'), url: "/settings", icon: <Settings size={20} /> },
  ]

  return (
    <aside className={`
      fixed top-0 left-0 h-screen z-50 bg-white dark:bg-darkColor border-r-2 text-black dark:text-white
      transition-all duration-100 overflow-hidden
      ${isMobile ? `
        w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      ` : `
        ${isSidebarOpen ? 'w-64' : 'w-16'}
      `}
    `}>
      <div className="p-4 border-b h-16 flex items-center">
          <button
            onClick={toggleSidebar}
            className={`flex items-center gap-3 hover:text-gray-600 transition-colors ${
              !isSidebarOpen ? 'mx-auto' : ''
            }`}
          >
            <Menu size={24} />
          </button>
          {isSidebarOpen && (
              <Link to={`/`} className='ml-3 flex items-center gap-2'>
                <p className='font-bold'>Limitless</p>
                <img src="/logo.svg" className='size-10' alt="logo" />
              </Link>
            )}
      </div>
      
      <nav className="p-2">
        <ul className="space-y-2 pt-3">
            <Link
                to="/create"
                className={`${!isSidebarOpen ? "p-1" : "p-1.5 px-4"} border-2 drop-shadow-md flex items-center max-w-36 gap-2 text-primaryColor rounded-full hover:scale-105 transition`}
            >
                <Plus className='text-primaryColor' size={35} strokeWidth={2.25} />
                <span 
                    className={`text-lg font-semibold ${!isSidebarOpen ? 'hidden' : 'block'}`}
                >
                    {t('create')}
                </span>
            </Link>

            {links.map((item) => (
                <Link
                    key={item.label}
                    to={item.url}
                    onClick={isMobile ? toggleSidebar : () => ""}
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-darkSecondary
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