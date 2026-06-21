"use client";

import React, { useEffect, useState } from "react";
import '@material/web/iconbutton/icon-button.js';
import { IconLightMode, IconDarkMode } from "./ui/icons";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial preference
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  if (!mounted) return <div className="w-10 h-10"></div>;

  return (
    <md-icon-button onClick={toggleTheme} aria-label="Toggle dark mode">
      <md-icon>{isDark ? <IconLightMode /> : <IconDarkMode />}</md-icon>
    </md-icon-button>
  );
}
