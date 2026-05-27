"use client";

import type { ElementType } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DocsIcon from "../icons/DocsIcon";
import EventsIcon from "../icons/EventsIcon";
import NewbiesIcon from "../icons/NewbiesIcon";
import StrategyIcon from "../icons/StrategyIcon";
import { AcademyButton } from "./AcademyButton";

type ResourceItem = {
  id: string;
  label: string;
  icon: ElementType;
};

const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: "docs",
    label: "Docs",
    icon: DocsIcon,
  },
  {
    id: "for-newbies",
    label: "For newbies",
    icon: NewbiesIcon,
  },
  {
    id: "strategies",
    label: "Strategies",
    icon: StrategyIcon,
  },
  {
    id: "events",
    label: "Events",
    icon: EventsIcon,
  },
];

type AcademyResourceNavProps = {
  className?: string;
  activeResourceId?: string;
};

export default function AcademyResourceNav({
  className,
  activeResourceId = "for-newbies",
}: AcademyResourceNavProps) {
  return (
    <nav className={cn("w-full", className)} aria-label="Academy resources">
      <div className="mx-auto max-w-[1200px] overflow-x-auto px-2 scrollbar-hide md:overflow-visible">
        <ul className="mx-auto flex w-full flex-wrap justify-center gap-2 py-1 md:min-w-[900px] md:flex-nowrap md:gap-3 md:py-0">
          {RESOURCE_ITEMS.map((item) => (
            <li
              key={item.id}
              className="flex flex-1 min-w-40 max-w-[220px] justify-center sm:w-1/2 md:w-auto md:flex-none"
            >
              <Link
                href={`/academy/${
                  item.id === "for-newbies" ? "" : item.id
                }`.replace(/\/$/, "")}
                className="block w-full"
              >
                {item.id === activeResourceId ? (
                  <AcademyButton
                    icon={item.icon}
                    label={item.label}
                    className="w-full"
                  />
                ) : (
                  <AcademyButton
                    icon={item.icon}
                    label={item.label}
                    className="w-full"
                    gradient="linear-gradient(180deg, rgba(15,18,29,0.92) 0%, rgba(15,18,29,1) 100%)"
                    iconColor="#6A6F84"
                    textColor="rgba(255, 255, 255, 0.65)"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
