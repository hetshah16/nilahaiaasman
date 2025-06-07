import React, { useEffect, useState } from 'react';
import lightbutn from "../assets/light.png";
import darkbtn from "../assets/dark.png";

const THEME_KEY = 'theme';

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
};


const ThemeToggleButton: React.FC = () => {
    const [darkMode, setDarkMode] = useState(
        typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            aria-label="Toggle dark/light mode"
        >
            <img
                src={darkMode ? lightbutn : darkbtn}
                alt="Toggle Dark Mode"
                className="w-6 h-6"
            />
        </button>
    );
};

export default ThemeToggleButton;