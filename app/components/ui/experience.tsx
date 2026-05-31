import { formatedDate } from "@/app/helpers/formatedDate";

import { MinusIcon } from "lucide-react";

import { ExperienceTypes } from "@/app/types";

function Experience({ experience }: { experience: ExperienceTypes }) {
  const title = experience.properties.title.title[0].plain_text;
  const subtitle = experience.properties.subtitle.rich_text[0].plain_text;
  const organization =
    experience.properties.organization.rich_text[0].plain_text;
  const periodStart = formatedDate(experience.properties.period.date.start);
  const periodEnd = experience.properties.period.date.end
    ? formatedDate(experience.properties.period.date.end)
    : "Atual";

  return (
    <div className="grid gap-1 md:grid-cols-2 md:gap-8">
      <div>
        <p className="text-base font-bold">{title}</p>
        <span className="text-muted-foreground text-xs">{subtitle}</span>
      </div>

      <div>
        <p className="text-base font-bold">{organization}</p>

        <div className="text-muted-foreground flex items-center gap-4 text-xs capitalize">
          <span>{periodStart}</span>
          <MinusIcon />
          <span>{periodEnd}</span>
        </div>
      </div>
    </div>
  );
}

export { Experience };
