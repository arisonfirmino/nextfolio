import { useRouter, usePathname } from "next/navigation";

import { CommandGroup, CommandItem } from "@/app/components/ui/command";

import { FolderClosedIcon, FolderOpenIcon } from "lucide-react";

import { ProjectTypes } from "@/app/types";

function ProjectNavigation({
  projects,
  setOpen,
}: {
  projects: ProjectTypes[];
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <CommandGroup heading="Projetos">
      {projects.map((project) => (
        <CommandItem
          key={project.id}
          onSelect={() => {
            router.push("/project/" + project.id);
            setOpen(false);
          }}
        >
          {pathname === "/project/" + project.id ? (
            <FolderOpenIcon />
          ) : (
            <FolderClosedIcon />
          )}

          {project.properties.title.title[0].plain_text}
          <span className="text-muted-foreground ml-auto text-xs tracking-widest">
            Projeto
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

export { ProjectNavigation };
