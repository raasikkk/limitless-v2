import { FC } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Profile from './Profile';

interface MobileNavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const MobileNavbar: FC<MobileNavbarProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation()


  const isLoggedin = true

  return (
    <nav className="sm:hidden max-h-16 fixed w-full top-0 z-40 bg-white dark:bg-[#1E293B] text-black dark:text-white p-4 
      flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="text-2xl hover:text-gray-300 transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="font-bold">Logo</div>
      </div>

      {
        isLoggedin ? (
          <div className="rounded-full ">
            <Profile />
          </div>
        ) : (
          <div className="flex items-center text-center gap-3">
            <Link
              to="/"
              className="min-w-24 p-1.5 px-4 text-white bg-black font-bold rounded-full hover:drop-shadow-md"
            >
              {t('signin')}
            </Link>
          </div>
        )
      }
    </nav>
  );
};

export default MobileNavbar