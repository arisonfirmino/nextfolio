import { Section } from "@/app/components/ui/section";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

import { MoveRightIcon } from "lucide-react";

export default async function Contact() {
  return (
    <Section title="Contato">
      <p className="text-foreground/80 text-sm">
        Lorem ipsum dolor sit amet. Eos sint fugiat rem quaerat expedita in
        natus enim. Id voluptate voluptas sit earum natus ea excepturi earum et
        consectetur omnis.
      </p>

      <form className="grid gap-8">
        <div className="grid grid-cols-2 gap-8">
          <Input placeholder="Seu nome" />
          <Input placeholder="Assunto" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <Input placeholder="seu@email.com" />
          <Input placeholder="(11) 99999-9999" />
        </div>

        <Textarea placeholder="Sua mensagem" />

        <button
          type="submit"
          className="text-foreground/80 hover:text-foreground flex w-fit cursor-pointer items-center gap-2 text-sm uppercase hover:underline [&_svg:not([class*='size-'])]:size-4"
        >
          Enviar <MoveRightIcon />
        </button>
      </form>
    </Section>
  );
}
