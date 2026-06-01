"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/app/components/ui/navbar";
import { Link } from "@/app/components/ui/link";

function Header() {
  const name = process.env.NEXT_PUBLIC_NAME;
  const username = process.env.NEXT_PUBLIC_USERNAME;
  const email = process.env.NEXT_PUBLIC_EMAIL;

  const links = [
    { platform: "LinkedIn", href: `https://www.linkedin.com/in/${username}` },
    { platform: "GitHub", href: `https://github.com/${username}` },
  ];

  const pathname = usePathname();

  return (
    <header className="flex w-full max-w-2xl items-center gap-8">
      <h1 className="text-base font-bold uppercase md:max-w-35 md:min-w-35 md:text-right">
        {name}
      </h1>

      <div className="flex w-full items-center justify-between text-xs">
        {pathname === "/contact" ? (
          <>
            <span className="text-foreground/80">Entre em contato</span>
            <Link href={`mailto:${email}`}>{email}</Link>
          </>
        ) : (
          links.map((link) => (
            <Link key={link.platform} href={link.href}>
              {link.platform === "LinkedIn"
                ? "in/" + username
                : "github/" + username}
            </Link>
          ))
        )}
        <Navbar />
      </div>
    </header>
  );
}

export { Header };
