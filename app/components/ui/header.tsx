import { Navbar } from "@/app/components/ui/navbar";

async function Header() {
  const name = process.env.NEXT_PUBLIC_NAME;
  const username = process.env.NEXT_PUBLIC_USERNAME;

  const links = [
    { platform: "LinkedIn", href: `https://www.linkedin.com/in/${username}` },
    { platform: "GitHub", href: `https://github.com/${username}` },
  ];

  return (
    <header className="flex w-full max-w-2xl items-center gap-8">
      <h1 className="text-base font-bold uppercase md:max-w-35 md:min-w-35 md:text-right">
        {name}
      </h1>

      <div className="flex w-full items-center justify-between text-xs">
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-foreground hover:underline"
          >
            {link.platform === "LinkedIn"
              ? "in/" + username
              : "github/" + username}
          </a>
        ))}
        <Navbar />
      </div>
    </header>
  );
}

export { Header };
