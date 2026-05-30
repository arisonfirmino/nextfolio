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
