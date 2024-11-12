import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiFillSun } from "react-icons/ai";

interface HeaderProp {
  label: string;
  showBackArrow?: boolean;
}

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the local storage for theme preference on initial load
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // Default to dark mode if no theme is saved in localStorage
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply the dark or light mode class to the root document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save the current theme mode to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="ml-4 p-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded transition duration-200 hover:bg-gray-500"
    >
      <AiFillSun />
    </button>
  );
};

const Header: React.FC<HeaderProp> = ({ label, showBackArrow }) => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center justify-between gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={24}
            className="cursor-pointer hover:opacity-70 transition text-white dark:text-black"
          />
        )}
        <h1 className="text-white dark:text-black text-xl font-semibold">{label}</h1>
        <DarkModeToggle /> {/* Dark Mode Toggle Button moved here */}
      </div>
    </div>
  );
};

export default Header;
