import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative w-14 h-7 flex items-center rounded-full transition-all duration-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-700 to-violet-700'
          : 'bg-gradient-to-r from-amber-300 to-orange-300'
      }`}
    >
      {/* Track icons */}
      <Sun className="absolute left-1.5 w-3.5 h-3.5 text-amber-600 opacity-80" />
      <Moon className="absolute right-1.5 w-3.5 h-3.5 text-indigo-200 opacity-80" />

      {/* Thumb */}
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-indigo-600" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
