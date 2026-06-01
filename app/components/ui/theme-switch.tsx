"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import {
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/app/components/ui/command";

import { MoonIcon, SunIcon, MonitorCogIcon } from "lucide-react";

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey;

      if (isTyping && !hasModifier) return;

      if (event.shiftKey) {
        const key = event.key.toLowerCase();

        if (key === "d") {
          event.preventDefault();
          setTheme("dark");
        }

        if (key === "l") {
          event.preventDefault();
          setTheme("light");
        }

        if (key === "y") {
          event.preventDefault();
          setTheme("system");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const themeItems = [
    {
      label: isDark ? "Light" : "Dark",
      icon: isDark ? <SunIcon /> : <MoonIcon />,
      action: () => setTheme(isDark ? "light" : "dark"),
      shortcut: ["Shift", isDark ? "L" : "D"],
    },
    {
      label: "Usar o sistema",
      icon: <MonitorCogIcon />,
      action: () => setTheme("system"),
      shortcut: ["Shift", "Y"],
      active: () => setTheme("system"),
    },
  ];

  return (
    <CommandGroup heading="Aperência">
      {themeItems.map((item, index) => (
        <CommandItem key={index} onSelect={item.action}>
          {item.icon} {item.label}
          <div className="ml-auto flex items-center gap-1">
            {item.shortcut.map((key, index) => (
              <CommandShortcut key={index}>{key}</CommandShortcut>
            ))}
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
export { ThemeSwitch };
