import { getSkills } from "@/app/lib/notion";

import { SkillTypes } from "@/app/types";

async function SkillCategory({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const skills: any = await getSkills(category);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-base font-bold uppercase">{title}</p>

      <ul className="grid">
        {skills
          .sort((a: SkillTypes, b: SkillTypes) =>
            a.properties.name.title[0].plain_text.localeCompare(
              b.properties.name.title[0].plain_text,
            ),
          )
          .map((skill: SkillTypes) => (
            <li key={skill.id}>
              <span className="text-muted-foreground text-sm">
                {skill.properties.name.title[0].plain_text}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export { SkillCategory };
