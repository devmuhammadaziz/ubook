"use client";

import { Moon, Sun1 } from "iconsax-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-foreground transition hover:bg-surface-2"
      aria-label="Toggle color theme"
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }}
    >
      <Moon size={18} color="currentColor" variant="Bold" className="dark:hidden" aria-hidden />
      <Sun1 size={18} color="currentColor" variant="Bold" className="hidden dark:block" aria-hidden />
    </button>
  );
}
