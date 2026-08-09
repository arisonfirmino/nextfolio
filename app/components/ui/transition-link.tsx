"use client";

import { useRouter } from "next/navigation";

import Link, { LinkProps } from "next/link";

import { useCallback, useRef, type MouseEvent } from "react";

import { cn } from "@/app/lib/utils";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  target?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function TransitionLink({
  children,
  href,
  className,
  duration = 500,
  target,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const isTransitioning = useRef(false);

  const handleTransition = useCallback(
    async (event: MouseEvent<HTMLAnchorElement>) => {
      const isModifiedClick =
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

      if (isModifiedClick || target === "_blank" || isTransitioning.current) {
        onClick?.(event);
        return;
      }

      event.preventDefault();
      onClick?.(event);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        router.push(href.toString());
        return;
      }

      const main = document.querySelector("#main");
      isTransitioning.current = true;

      main?.classList.add("page-transition-out");
      await sleep(duration);
      main?.classList.remove("page-transition-out");

      router.push(href.toString());

      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );

      main?.classList.add("page-transition-in");
      await sleep(duration);
      main?.classList.remove("page-transition-in");

      isTransitioning.current = false;
    },
    [href, duration, target, onClick, router],
  );

  return (
    <Link
      onClick={handleTransition}
      href={href}
      target={target}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export { TransitionLink };
