"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { CommandItem, CommandShortcut } from "@/app/components/ui/command";

import { HomeIcon } from "lucide-react";

function HomeCommand({ setOpen }: { setOpen: (open: boolean) => void }) {
  const router = useRouter();

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

        if (key === "h") {
          event.preventDefault();
          router.push("/");
          setOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, setOpen]);

  return (
    <CommandItem
      onSelect={() => {
        router.push("/");
        setOpen(false);
      }}
    >
      <HomeIcon /> Home
      <div className="ml-auto flex items-center gap-1">
        {["Shift", "H"].map((key, index) => (
          <CommandShortcut key={index}>{key}</CommandShortcut>
        ))}
      </div>
    </CommandItem>
  );
}

export { HomeCommand };
