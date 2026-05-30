import { cn } from "@/app/lib/utils";

function Section({
  className,
  children,
  title,
  ...props
}: React.ComponentProps<"section"> & { title: string }) {
  return (
    <section
      data-slot="section"
      className="flex w-full max-w-2xl flex-col gap-8 md:flex-row md:gap-16"
      {...props}
    >
      {title && (
        <span className="text-muted-foreground text-base font-bold uppercase md:max-w-28 md:min-w-28 md:text-right">
          {title}
        </span>
      )}
      <div className={cn(className, "flex")}>{children}</div>
    </section>
  );
}

export { Section };
