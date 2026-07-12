import { formatedDate } from "@/app/helpers/formatedDate";

import { Link } from "@/app/components/ui/link";

import { MinusIcon, SquareArrowOutUpRightIcon } from "lucide-react";

import { ProjectTypes } from "@/app/types";

function Project({ project }: { project: ProjectTypes }) {
  return (
    <div className="flex flex-col gap-2">
      <ProjectHeader
        title={project.properties.title.title[0].plain_text}
        subtitle={project.properties.subtitle.select.name}
      />

      <ProjectDescription
        description={project.properties.description.rich_text[0].plain_text}
      />

      <ProjectFooter
        date={project.properties.date.date.start}
        techs={project.properties.techs.rich_text[0].plain_text}
        href={project.properties.deploy.url}
      />
    </div>
  );
}

function ProjectHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-base font-bold">{title}</p>
      <MinusIcon size={16} className="text-muted-foreground" />
      <span className="text-muted-foreground text-xs">{subtitle}</span>
    </div>
  );
}

function ProjectFooter({
  date,
  techs,
  href,
}: {
  date: string;
  techs: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="text-muted-foreground flex items-center gap-4">
        <span>{formatedDate(date)}</span>
        <MinusIcon />
        <span>{techs}</span>
      </div>

      <Link href={href} className="text-primary! uppercase">
        <SquareArrowOutUpRightIcon /> Ver projeto
      </Link>
    </div>
  );
}

function ProjectDescription({ description }: { description: string }) {
  return <p className="text-foreground/80 text-sm">{description}</p>;
}

export { Project };
