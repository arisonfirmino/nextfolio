import { getProjects, getSocials } from "@/app/lib/notion";

import { Menu } from "@/app/components/ui/menu";

async function Footer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects: any = await getProjects();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const links: any = await getSocials({
    or: [
      { property: "platform", title: { equals: "E-mail" } },
      { property: "platform", title: { equals: "Resume" } },
    ],
  });

  return (
    <footer className="flex w-full max-w-2xl flex-col gap-4 px-5 md:px-0">
      <div className="relative flex items-center justify-end">
        <Menu projects={projects} links={links} />
        <hr className="border-border absolute w-full" />
      </div>

      <p className="text-muted-foreground text-xs">
        © 2026 Arison Firmino. All Rights Reserved
      </p>
    </footer>
  );
}

export { Footer };
