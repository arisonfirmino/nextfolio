import { getAboutMe } from "@/app/lib/notion";

import { Section } from "@/app/components/ui/section";

import Image from "next/image";

export default async function About() {
  const blocks = await getAboutMe();

  const avatar = process.env.NEXT_PUBLIC_AVATAR as string;

  return (
    <Section title="Sobre">
      <Image
        src={avatar}
        alt={process.env.NEXT_PUBLIC_NAME as string}
        width={3000}
        height={1688}
        className="bg-muted aspect-video w-full"
      />

      <div
        className="text-foreground/80 flex flex-col gap-8 text-sm [&_svg:not([class*='size-'])]:size-3.5"
        dangerouslySetInnerHTML={{
          __html: blocks
            .replace(
              /<a href="(http[^"]+)"/g,
              '<a href="$1" target="_blank" rel="noopener noreferrer"',
            )
            .replace(
              /<\/a>/g,
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              class="inline-block ml-1.5 mb-0.5 align-middle">
              <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
              <path d="m21 3-9 9"/>
              <path d="M15 3h6v6"/>
            </svg></a>`,
            ),
        }}
      />
    </Section>
  );
}
