import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { MinusIcon } from "lucide-react";

import { ProjectTypes } from "@/app/types";

function Project({ project }: { project: ProjectTypes }) {
  return (
    <div className="flex flex-col gap-2 [&_svg:not([class*='size-'])]:size-4">
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
      <MinusIcon className="text-muted-foreground" />
      <span className="text-muted-foreground text-xs">{subtitle}</span>
    </div>
  );
}

function ProjectFooter({ date, techs }: { date: string; techs: string }) {
  return (
    <div className="text-muted-foreground flex items-center gap-4 text-xs">
      <span className="capitalize">
        {format(date, "MMMM yyyy", { locale: ptBR })}
      </span>
      <MinusIcon />
      <span>{techs}</span>
    </div>
  );
}

function ProjectDescription({ description }: { description: string }) {
  return <p className="text-foreground/80 text-sm">{description}</p>;
}

export { Project };
