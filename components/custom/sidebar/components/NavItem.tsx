import Link from "next/link";
import type { ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  SIDEBAR_FONT_CLASS,
  SIDEBAR_ITEM_TEXT_CLASS,
} from "../constants/styles";
import { withSidebarIconSizing } from "../utils/withSidebarIconSizing";

type NavItemProps = {
  icon: ReactElement;
  label: string;
  href?: string;
};

export function NavItem({ icon, label, href }: NavItemProps) {
  const classes =
    "flex w-full items-center justify-start gap-4 rounded-lg px-4 py-3 text-left transition-colors hover:bg-muted/50";
  const sizedIcon = withSidebarIconSizing(icon);
  const content = (
    <>
      <span className="flex items-center text-muted-foreground">
        {sizedIcon}
      </span>
      <span
        className={cn(
          SIDEBAR_ITEM_TEXT_CLASS,
          "text-muted-foreground text-lg",
          SIDEBAR_FONT_CLASS
        )}
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Button asChild variant="ghost" className={classes}>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" className={classes}>
      {content}
    </Button>
  );
}
