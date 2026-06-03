import React from "react";
import lightModeIcon from "../assets/light-mode.png";
import darkModeIcon from "../assets/night-mode.png";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="flex justify-between items-center px-6 py-6 shadow bg-(--element-color)">
      <h1 className="font-bold text-xl">Where in the world?</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 font-semibold cursor-pointer"
      >
        <img
          src={darkMode ? lightModeIcon : darkModeIcon}
          alt="theme icon"
          className="w-5 h-5"
        />
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </header>
  );
};

export default Header;
