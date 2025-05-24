import { FC } from 'react';
import { Home, Trophy, CirclePlus, User, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/hooks';

const MobileFooter: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  const links = [
    { label: t('home'), url: "/", icon: <Home size={20} /> },
    { label: t('competitions'), url: "/competitions", icon: <Trophy size={20} /> },
    { 
      label: t('create'), 
      url: "/create", 
      icon: <CirclePlus className="" size={24} strokeWidth={2} />,
    },
    { label: t('profile'), url: `/profile/${user?.id}`, icon: <User size={20} /> },
    { label: t('settings'), url: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-darkSecondary border-t border-gray-200 dark:border-gray-700 sm:hidden backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-around items-center h-16 px-2">
        {links.map((item) => (
          <Link
            key={item.label}
            to={item.url}
            className={`flex items-center justify-center w-full h-full relative
              transition-all duration-200 ease-in-out
              ${location.pathname === item.url 
                ? 'text-primaryColor scale-110' 
                : 'text-gray-600 dark:text-gray-300 hover:text-primaryColor dark:hover:text-primaryColor'
              }`}
          >
            {item.icon}
            {location.pathname === item.url && (
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primaryColor rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileFooter; 