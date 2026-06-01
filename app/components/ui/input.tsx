import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/app/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      autoComplete="off"
      className={cn(
        "focus-visible:border-foreground placeholder:text-muted-foreground h-10 w-full border-b px-3 py-2 text-base outline-none md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
