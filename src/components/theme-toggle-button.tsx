"use client";

import { useTheme } from "@/context/theme-context";
import { Button } from "./ui/button";

import { Sun } from "lucide-react";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className={`dark:bg-background rounded-md transition-colors duration-300`}
    >
      {theme === "light" ? (
        <Sun className="text-blue-500" />
      ) : (
        <Sun className="text-yellow-500" />
      )}
    </Button>
  );
};

export default ThemeToggleButton;
