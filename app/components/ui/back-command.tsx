"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { CommandItem, CommandShortcut } from "@/app/components/ui/command";

import { ArrowLeftIcon } from "lucide-react";

function BackCommand({ setOpen }: { setOpen: (open: boolean) => void }) {
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

        if (key === "b") {
          event.preventDefault();
          router.back();
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
        router.back();
        setOpen(false);
      }}
    >
      <ArrowLeftIcon /> Voltar
      <div className="ml-auto flex items-center gap-1">
        {["Shift", "B"].map((key, index) => (
          <CommandShortcut key={index}>{key}</CommandShortcut>
        ))}
      </div>
    </CommandItem>
  );
}

export { BackCommand };
