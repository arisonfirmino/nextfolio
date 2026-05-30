import { getProjects } from "@/app/lib/notion";

import { Section } from "@/app/components/ui/section";
import { Project } from "@/app/components/ui/project";

import { ProjectTypes } from "@/app/types";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects: any = await getProjects();

  return (
    <main className="flex flex-col items-center gap-8 px-5 py-16 md:px-0">
      <Section title="Projetos" className="flex-col gap-8">
        {projects.map((project: ProjectTypes) => (
          <Project key={project.id} project={project} />
        ))}
      </Section>
    </main>
  );
}
