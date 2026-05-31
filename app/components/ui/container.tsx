import { cn } from "@/app/lib/utils";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn(
        className,
        "flex min-h-screen w-full flex-col items-center gap-8 py-16",
      )}
      {...props}
    />
  );
}

export { Container };
