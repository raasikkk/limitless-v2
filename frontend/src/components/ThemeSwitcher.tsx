import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (dark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, []); 

    const toggleTheme = (isDark: boolean) => {
        setDark(isDark);
        document.body.classList.toggle("dark", isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    return (
        <div className="mt-5 space-y-4">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Theme</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Toggle the dark mode by choosing Limitless UI theme below
                </p>
            </div>
            
            <div className="flex gap-2">
                <button
                    onClick={() => toggleTheme(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                        ${!dark 
                            ? "bg-blue-500 text-white hover:bg-blue-600" 
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"}`
                    }
                >
                    <Sun className="w-4 h-4" />
                    Light
                </button>
                
                <button
                    onClick={() => toggleTheme(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                        ${dark 
                            ? "bg-blue-500 text-white hover:bg-blue-600" 
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"}`
                    }
                >
                    <Moon className="w-4 h-4" />
                    Dark
                </button>
            </div>
        </div>
    );
};

export default ThemeSwitcher;