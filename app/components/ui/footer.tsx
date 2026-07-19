import { getSocials } from "@/app/lib/notion";

import { CommandMenu } from "@/app/components/ui/command-menu";

async function Footer() {
  const [contactLinks, socialLinks] = await Promise.all([
    getSocials({
      or: [
        { property: "platform", title: { equals: "E-mail" } },
        { property: "platform", title: { equals: "Resume" } },
      ],
    }) as any,
    getSocials({
      or: [
        { property: "platform", title: { equals: "LinkedIn" } },
        { property: "platform", title: { equals: "GitHub" } },
        { property: "platform", title: { equals: "X" } },
      ],
    }) as any,
  ]);

  return (
    <footer className="flex w-full max-w-2xl flex-col gap-4 px-5 md:px-0">
      <div className="relative flex items-center justify-end">
        <CommandMenu contactLinks={contactLinks} socialLinks={socialLinks} />
        <hr className="border-border absolute w-full" />
      </div>

      <p className="text-muted-foreground text-xs">
        © 2026 Arison Firmino. All Rights Reserved
      </p>
    </footer>
  );
}

export { Footer };
