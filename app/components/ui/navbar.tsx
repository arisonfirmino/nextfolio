"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

import { TransitionLink } from "@/app/components/ui/transition-link";

import { cn } from "@/app/lib/utils";

function Navbar() {
  const pages = [
    { name: "Home", href: "/" },
    { name: "Sobre", href: "/about" },
  ];

  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4 text-sm uppercase">
      {pages.map((page, index) => (
        <Fragment key={page.href}>
          <TransitionLink
            href={page.href}
            className={cn(
              pathname === page.href
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {page.name}
          </TransitionLink>

          {index < pages.length - 1 && (
            <span className="text-muted-foreground">/</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export { Navbar };
