export type ProjectTypes = {
  id: string;
  properties: {
    title: { title: [{ plain_text: string }] };
    description: { rich_text: [{ plain_text: string }] };
    subtitle: { select: { name: string } };
    techs: { rich_text: [{ plain_text: string }] };
    date: { date: { start: string } };
  };
};

export type ExperienceTypes = {
  id: string;
  properties: {
    title: { title: [{ plain_text: string }] };
    subtitle: { rich_text: [{ plain_text: string }] };
    organization: { rich_text: [{ plain_text: string }] };
    period: { date: { start: string; end?: string } };
  };
};
