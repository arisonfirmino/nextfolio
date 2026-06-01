import { getProjects } from "@/app/lib/notion";

import { Menu } from "@/app/components/ui/menu";

async function Footer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects: any = await getProjects();

  return (
    <footer className="flex w-full max-w-2xl flex-col gap-4">
      <div className="relative flex items-center justify-end">
        <Menu projects={projects} />
        <hr className="border-border absolute w-full" />
      </div>

      <p className="text-muted-foreground text-xs">
        © 2026 Arison Firmino. All Rights Reserved
      </p>
    </footer>
  );
}

export { Footer };
