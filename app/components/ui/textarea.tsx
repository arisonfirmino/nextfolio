import * as React from "react";

import { cn } from "@/app/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      autoComplete="off"
      className={cn(
        "focus-visible:border-foreground placeholder:text-muted-foreground h-10 min-h-16 w-full resize-none border-b px-3 py-2 text-base outline-none md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
