import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useWindowSize } from "./hooks/useWindowSize";
import Sidebar from './components/Sidebar';
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import SuggestionPopup from "./components/SuggestionPopup";

const Layout = () => {
  const { isMobile, isTablet } = useWindowSize();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const colorTheme = localStorage.getItem("theme")

  useEffect(() => {
    if (colorTheme) {
      document.body.classList.add(colorTheme);
    }
  }, [])

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
    <div className="min-h-screen bg-white dark:bg-darkColor"> 
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
        pt-16 sm:pt-0 min-h-screen
        ${isMobile ? '' : `
          ${isSidebarOpen ? 'lg:ml-64' : 'sm:ml-16'}
          ${isTablet ? (isSidebarOpen ? 'md:ml-64' : 'sm:ml-16') : ''}
        `}
      `}>
        <div className="p-4 md:p-6">
          <SearchBar />
          <Outlet />

          <SuggestionPopup />

          {/* <button className="flex text-white items-center gap-2 fixed bottom-5 right-5 p-2 px-4 font-semibold bg-primaryColor rounded-md animate-bounce duration-1000 opacity-90">
            <Bot />
            Suggestions
          </button> */}
        </div>
      </main>

      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout