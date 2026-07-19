"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { CommandItem } from "@/app/components/ui/command";
import { Badge } from "@/app/components/ui/badge";

import { MoonIcon, SunIcon, MonitorCogIcon, LucideIcon } from "lucide-react";

type ThemeCommand = {
  id: string;
  label: string;
  icon: LucideIcon;
  shortcutKey: string;
  shortcutLabel: string;
  isActive: boolean;
  run: () => void;
};

function useThemeCommands() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const isSystem = theme === "system";

  const commands: ThemeCommand[] = [
    {
      id: "toggle-theme",
      label: isDark ? "Light" : "Dark",
      icon: isDark ? SunIcon : MoonIcon,
      shortcutKey: isDark ? "l" : "d",
      shortcutLabel: isDark ? "L" : "D",
      isActive: !isSystem,
      run: () => setTheme(isDark ? "light" : "dark"),
    },
    {
      id: "system-theme",
      label: "Usar o sistema",
      icon: MonitorCogIcon,
      shortcutKey: "y",
      shortcutLabel: "Y",
      isActive: isSystem,
      run: () => setTheme("system"),
    },
  ];

  return { mounted, commands };
}

function ThemeCommandGroup({ onSelect }: { onSelect: () => void }) {
  const { mounted, commands } = useThemeCommands();

  if (!mounted) return null;

  return (
    <>
      {commands.map(({ id, label, icon: Icon, shortcutLabel, run }) => (
        <CommandItem
          key={id}
          onSelect={() => {
            run();
            onSelect();
          }}
        >
          <Icon />
          {label}

          <div className="ml-auto flex items-center gap-1.5">
            {["Shift", shortcutLabel].map((key) => (
              <Badge
                key={key}
                className="group-data-selected/command-item:bg-background tracking-widest"
              >
                {key}
              </Badge>
            ))}
          </div>
        </CommandItem>
      ))}
    </>
  );
}
export { ThemeCommandGroup, useThemeCommands };
