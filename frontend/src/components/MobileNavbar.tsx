import { FC } from 'react';
import { Menu } from 'lucide-react';

interface MobileNavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const MobileNavbar: FC<MobileNavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="sm:hidden fixed w-full top-0 z-40 bg-white text-black p-4 
      flex items-center justify-between shadow-lg">
      <button
        onClick={toggleSidebar}
        className="text-2xl hover:text-gray-300 transition-colors"
      >
        <Menu size={24} />
      </button>
      <div className="font-bold">Logo</div>
    </nav>
  );
};

export default MobileNavbar