"use client";

import { useState, useEffect } from "react";

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
import { ThemeSwitch } from "@/app/components/ui/theme-switch";
import { NavigationCommand } from "@/app/components/ui/navigation-command";
import { ProjectNavigation } from "@/app/components/ui/project-navigation";

import { MailIcon, FileTextIcon, ArrowLeftIcon, HomeIcon } from "lucide-react";

import { ProjectTypes, SocialTypes } from "@/app/types";

function Menu({
  projects,
  links,
}: {
  projects: ProjectTypes[];
  links: SocialTypes[];
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const email = links.find(
    (link) => link.properties.platform.title[0]?.plain_text === "E-mail",
  )?.properties.href.url;

  const resume = links.find(
    (link) => link.properties.platform.title[0]?.plain_text === "Resume",
  )?.properties.href.url;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (event.shiftKey) {
        const key = event.key.toLowerCase();

        if (key === "b") {
          event.preventDefault();
          router.back();
          setOpen(false);
        }

        if (key === "h") {
          event.preventDefault();
          router.push("/");
          setOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <>
      <Badge onClick={() => setOpen(true)} className="z-10 cursor-pointer">
        ⌘+K
      </Badge>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Digite um comando ou pesquise..." />

          <CommandList>
            <CommandGroup heading="Navegação">
              {["back", "home"].map((command) => (
                <CommandItem key={command}>
                  {command === "back" ? <ArrowLeftIcon /> : <HomeIcon />}
                  {command === "back" ? "Voltar" : "Home"}

                  <div className="ml-auto flex items-center gap-1.5">
                    {["Shift", command === "back" ? "B" : "H"].map(
                      (shortcut) => (
                        <Badge
                          key={shortcut}
                          className="group-data-selected/command-item:bg-background tracking-widest"
                        >
                          {shortcut}
                        </Badge>
                      ),
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Contato">
              {["resume", "email"].map((command) => (
                <CommandItem
                  key={command}
                  onSelect={() => {
                    setOpen(false);
                    window.open(
                      command === "email" ? email : resume,
                      command === "email" ? "_self" : "_blank",
                    );
                  }}
                >
                  {command === "email" ? <MailIcon /> : <FileTextIcon />}
                  {command === "email"
                    ? email?.replace("mailto:", "")
                    : "Currículo"}

                  <CommandShortcut>Link</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <ThemeSwitch />
            <NavigationCommand setOpen={setOpen} />
            <ProjectNavigation projects={projects} setOpen={setOpen} />
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export { Menu };
