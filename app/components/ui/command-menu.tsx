"use client";

import { useState, useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";

import { Badge } from "@/app/components/ui/badge";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/app/components/ui/command";
import {
  ThemeCommandGroup,
  useThemeCommands,
} from "@/app/components/ui/theme-command-group";

import {
  MailIcon,
  FileTextIcon,
  ArrowLeftIcon,
  HomeIcon,
  LucideIcon,
} from "lucide-react";

import { ProjectTypes, SocialTypes } from "@/app/types";

const SOCIAL_PLATFORM = {
  EMAIL: "E-mail",
  RESUME: "Resume",
} as const;

function getSocialHref(links: SocialTypes[], platform: string) {
  return links.find(
    (link) => link.properties.platform.title[0]?.plain_text === platform,
  )?.properties.href.url;
}

type NavCommand = {
  id: "back" | "home";
  label: string;
  icon: LucideIcon;
  shortcutKey: string;
  shortcutLabel: string;
  run: (router: ReturnType<typeof useRouter>) => void;
};

const NAV_COMMANDS: NavCommand[] = [
  {
    id: "back",
    label: "Voltar",
    icon: ArrowLeftIcon,
    shortcutKey: "b",
    shortcutLabel: "B",
    run: (router) => router.back(),
  },
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    shortcutKey: "h",
    shortcutLabel: "H",
    run: (router) => router.push("/"),
  },
];

function CommandMenu({
  projects,
  links,
}: {
  projects: ProjectTypes[];
  links: SocialTypes[];
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { commands: themeCommands } = useThemeCommands();

  const email = useMemo(
    () => getSocialHref(links, SOCIAL_PLATFORM.EMAIL),
    [links],
  );
  const resume = useMemo(
    () => getSocialHref(links, SOCIAL_PLATFORM.RESUME),
    [links],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (!event.shiftKey) return;

      const key = event.key.toLowerCase();

      const navCommand = NAV_COMMANDS.find((cmd) => cmd.shortcutKey === key);

      if (navCommand) {
        event.preventDefault();
        navCommand.run(router);
        setOpen(false);
        return;
      }

      const themeCommand = themeCommands.find((cmd) => cmd.shortcutKey === key);

      if (themeCommand) {
        event.preventDefault();
        themeCommand.run();
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, themeCommands]);

  return (
    <>
      <Badge
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        className="z-10 cursor-pointer"
      >
        ⌘+K
      </Badge>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Digite um comando ou pesquise..." />

          <CommandList>
            <CommandGroup heading="Navegação">
              {NAV_COMMANDS.map(
                ({ id, label, icon: Icon, shortcutLabel, run }) => (
                  <CommandItem
                    key={id}
                    onSelect={() => {
                      run(router);
                      setOpen(false);
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
                ),
              )}
            </CommandGroup>

            <CommandGroup heading="Contato">
              {email && (
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    window.location.href = email;
                  }}
                >
                  <MailIcon />
                  {email.replace("mailto:", "")}
                  <CommandShortcut>Link</CommandShortcut>
                </CommandItem>
              )}

              {resume && (
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    window.open(resume, "_blank", "noopener,noreferrer");
                  }}
                >
                  <FileTextIcon />
                  Currículo
                  <CommandShortcut>Link</CommandShortcut>
                </CommandItem>
              )}
            </CommandGroup>

            <CommandGroup heading="Aparência">
              <ThemeCommandGroup onSelect={() => setOpen(false)} />
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export { CommandMenu };
