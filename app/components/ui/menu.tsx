"use client";

import { useState, useEffect } from "react";

import { Badge } from "@/app/components/ui/badge";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/app/components/ui/command";
import ThemeSwitch from "@/app/components/ui/theme-switch";

function Menu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Badge onClick={() => setOpen(true)} className="z-10 cursor-pointer">
        ⌘+K
      </Badge>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Digite um comando ou pesquise..." />

          <CommandList>
            <ThemeSwitch />
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export { Menu };
