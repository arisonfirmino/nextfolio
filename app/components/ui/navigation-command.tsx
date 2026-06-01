"use client";

import { useRouter } from "next/navigation";

import { CommandGroup, CommandItem } from "@/app/components/ui/command";

import { CircleUserIcon, HomeIcon, MailIcon } from "lucide-react";

function NavigationCommand({ setOpen }: { setOpen: (open: boolean) => void }) {
  const pages = [
    { name: "Home", icon: <HomeIcon />, href: "/" },
    { name: "Sobre", icon: <CircleUserIcon />, href: "/about" },
    { name: "Contato", icon: <MailIcon />, href: "/contact" },
  ];

  const router = useRouter();

  return (
    <CommandGroup heading="Navegação">
      {pages.map((page) => (
        <CommandItem
          key={page.href}
          onSelect={() => {
            router.push(page.href);
            setOpen(false);
          }}
        >
          {page.icon} {page.name}
          <span className="text-muted-foreground ml-auto text-xs tracking-widest">
            Página
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

export { NavigationCommand };
