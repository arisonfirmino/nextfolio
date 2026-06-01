import { getPageBlocks } from "@/app/lib/notion";

import { Section } from "@/app/components/ui/section";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blocks = await getPageBlocks(id);

  return (
    <Section title="Projeto">
      <div
        className="text-foreground/80 flex flex-col gap-8 text-sm"
        dangerouslySetInnerHTML={{ __html: blocks }}
      />
    </Section>
  );
}
