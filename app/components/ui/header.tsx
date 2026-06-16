import { getSocials } from "@/app/lib/notion";

import { Navbar } from "@/app/components/ui/navbar";
import { Link } from "@/app/components/ui/link";

import { SocialTypes } from "@/app/types";

async function Header() {
  const name = process.env.NEXT_PUBLIC_NAME;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socials: any = await getSocials({
    or: [
      { property: "platform", title: { equals: "LinkedIn" } },
      { property: "platform", title: { equals: "GitHub" } },
    ],
  });

  return (
    <header className="flex w-full max-w-2xl flex-col items-center gap-4 px-5 md:flex-row md:gap-8 md:px-0">
      <h1 className="text-base font-bold uppercase md:max-w-35 md:min-w-35 md:text-right">
        {name}
      </h1>

      <div className="flex w-full items-center justify-between text-xs">
        {socials.map((social: SocialTypes) => (
          <Link key={social.id} href={social.properties.href.url}>
            {social.properties.platform.title[0].plain_text === "LinkedIn"
              ? "in/" + social.properties.username.rich_text[0].plain_text
              : "github/" + social.properties.username.rich_text[0].plain_text}
          </Link>
        ))}

        <Navbar />
      </div>
    </header>
  );
}

export { Header };
