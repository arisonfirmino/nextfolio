import { cn } from "@/app/lib/utils";

function Main({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      id="main"
      data-slot="main"
      className={cn(
        className,
        "relative flex flex-1 flex-col items-center gap-8 px-5 md:px-0",
      )}
      {...props}
    />
  );
}

export { Main };
