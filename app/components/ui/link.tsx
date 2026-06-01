import { cn } from "@/app/lib/utils";

function Link({
  className,
  href,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        className,
        "text-foreground/80 hover:text-foreground hover:underline",
      )}
      {...props}
    />
  );
}

export { Link };
