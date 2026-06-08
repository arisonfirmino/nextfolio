import { formatedDate } from "@/app/helpers/formatedDate";

import { MinusIcon } from "lucide-react";

import { ExperienceTypes } from "@/app/types";

function Experience({ experience }: { experience: ExperienceTypes }) {
  const title = experience.properties.title.title[0].plain_text;
  const organization =
    experience.properties.organization.rich_text[0].plain_text;
  const periodStart = formatedDate(experience.properties.period.date.start);
  const periodEnd = experience.properties.period.date.end
    ? formatedDate(experience.properties.period.date.end)
    : "Presente";

  return (
    <div className="grid">
      <p className="text-base font-bold">{title}</p>

      <div className="text-muted-foreground flex w-full items-center gap-4 text-xs capitalize">
        <span className="line-clamp-1">{organization}</span>
        <MinusIcon />
        <span className="line-clamp-1 w-full max-w-[40%]">
          {periodStart} - {periodEnd}
        </span>
      </div>
    </div>
  );
}

export { Experience };
