import { cloneElement } from "react";
import type { CSSProperties, ReactElement } from "react";

import { cn } from "@/lib/utils";

import { SIDEBAR_ICON_SIZE } from "../constants/sidebar";

export function withSidebarIconSizing(icon: ReactElement) {
  const props = icon.props as {
    className?: string;
    style?: CSSProperties;
    color?: string;
    [key: string]: unknown;
  };

  return cloneElement(icon, {
    ...props,
    color: props.color ?? "currentColor",
    size: SIDEBAR_ICON_SIZE,
    width: SIDEBAR_ICON_SIZE,
    height: SIDEBAR_ICON_SIZE,
    className: cn("shrink-0", props.className),
    style: {
      ...(props.style ?? {}),
      width: SIDEBAR_ICON_SIZE,
      height: SIDEBAR_ICON_SIZE,
    },
  } as any);
}
