import changeTheme from "../changeTheme"
import { useState } from "react";
export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState("#000ff0");
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <header className="flex justify-between items-center p-4">
      <input
        type="color"
        className="bg-transparent border-none appearance-none w-8 h-8 p-0"
        onChange={(e) => {
          changeTheme(e.target.value);
          setTheme(e.target.value);
        }}
        value={theme}
      />
      <h1 className="text-primary text-4xl text-center font-bold">
        Notes & Todo
      </h1>
      <button onClick={toggleDarkMode}>
        <span className="icon text-primary">
          {isDarkMode ? "dark" : "light"}_mode
        </span>
      </button>
    </header>
  );
}
