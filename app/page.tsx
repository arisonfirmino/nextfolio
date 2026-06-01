import { getProjects, getExperiences } from "@/app/lib/notion";

import { Section } from "@/app/components/ui/section";
import { Project } from "@/app/components/ui/project";
import { Experience } from "@/app/components/ui/experience";

import { ExperienceTypes, ProjectTypes } from "@/app/types";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects: any = await getProjects();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const experiences: any = await getExperiences();

  return (
    <>
      <Section title="Projetos">
        {projects.map((project: ProjectTypes) => (
          <Project key={project.id} project={project} />
        ))}
      </Section>

      <Section title="Experiência">
        {experiences.map((experience: ExperienceTypes) => (
          <Experience key={experience.id} experience={experience} />
        ))}
      </Section>
    </>
  );
}
