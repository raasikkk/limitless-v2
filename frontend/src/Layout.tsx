import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useWindowSize } from "./hooks/useWindowSize";
import Sidebar from './components/Sidebar';
import MobileNavbar from "./components/MobileNavbar";

const Layout = () => {
  const { isMobile, isTablet } = useWindowSize();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobile || isTablet) {
      setSidebarOpen(false);
      setMobileMenuOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile, isTablet]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="min-h-screen">
      <MobileNavbar 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isMobile ? isMobileMenuOpen : isSidebarOpen}
      />
      
      <Sidebar
        isMobile={isMobile}
        isTablet={isTablet}
        isSidebarOpen={isMobile ? isMobileMenuOpen : isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className={`
        pt-16 lg:pt-0 min-h-screen
        ${isMobile ? '' : `
          ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}
          ${isTablet ? (isSidebarOpen ? 'md:ml-64' : 'md:ml-16') : ''}
        `}
      `}>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>

      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Footer */}
    </div>
  );
};

export default Layout