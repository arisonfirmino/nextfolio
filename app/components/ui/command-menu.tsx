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
  GlobeIcon,
  LucideIcon,
} from "lucide-react";

import { SocialTypes } from "@/app/types";

const SOCIAL_PLATFORM = {
  EMAIL: "E-mail",
  RESUME: "Resume",
} as const;

const SOCIAL_ICON: Record<string, LucideIcon> = {
  GitHub: GlobeIcon,
  LinkedIn: GlobeIcon,
  X: GlobeIcon,
};

const DEFAULT_SOCIAL_ICON = GlobeIcon;

type NavCommand = {
  id: "back" | "home";
  label: string;
  icon: LucideIcon;
  shortcutKey: string;
  shortcutLabel: string;
  run: (router: ReturnType<typeof useRouter>) => void;
};

type SocialCommand = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

function getSocialHref(links: SocialTypes[], platform: string) {
  return links.find(
    (link) => link.properties.platform.title[0]?.plain_text === platform,
  )?.properties.href.url;
}

function toSocialCommand(link: SocialTypes): SocialCommand {
  const platform = link.properties.platform.title[0]?.plain_text ?? "";

  return {
    id: link.id,
    label: platform,
    icon: SOCIAL_ICON[platform] ?? DEFAULT_SOCIAL_ICON,
    href: link.properties.href.url,
  };
}

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
  contactLinks,
  socialLinks,
}: {
  contactLinks: SocialTypes[];
  socialLinks: SocialTypes[];
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { commands: themeCommands } = useThemeCommands();

  const email = useMemo(
    () => getSocialHref(contactLinks, SOCIAL_PLATFORM.EMAIL),
    [contactLinks],
  );
  const resume = useMemo(
    () => getSocialHref(contactLinks, SOCIAL_PLATFORM.RESUME),
    [contactLinks],
  );

  const socialCommands = useMemo(
    () => socialLinks.map(toSocialCommand),
    [socialLinks],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
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

            <CommandGroup heading="Redes Sociais">
              {socialCommands.map(({ id, label, icon: Icon, href }) => (
                <CommandItem
                  key={id}
                  onSelect={() => {
                    setOpen(false);
                    window.open(href, "_blank", "noopener,noreferrer");
                  }}
                >
                  <Icon />
                  {label}
                  <CommandShortcut>Link</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export { CommandMenu };
