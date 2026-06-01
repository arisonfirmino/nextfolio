import { getAboutMe } from "@/app/lib/notion";

import { Section } from "@/app/components/ui/section";

import Image from "next/image";

export default async function About() {
  const blocks = await getAboutMe();

  const avatar = process.env.NEXT_PUBLIC_AVATAR as string;

  return (
    <Section title="Sobre" className="flex-col gap-8">
      <Image
        src={avatar}
        alt={process.env.NEXT_PUBLIC_NAME as string}
        width={3000}
        height={1688}
        className="bg-muted aspect-video w-full"
      />

      <div
        className="text-foreground/80 flex flex-col gap-8 text-sm"
        dangerouslySetInnerHTML={{ __html: blocks }}
      />
    </Section>
  );
}
