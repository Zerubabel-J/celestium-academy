"use client";

import { createElement } from "react";

import { ChevronRight } from "lucide-react";
import { SearchIcon } from "../navbar/icons/SearchIcon";
import { CryptoChart } from "../../CryptoChart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserSnapshot } from "@/types/user";
import { WalletButton } from "../wallet-button/WalletButton";
import { WalletBalanceBadge } from "../wallet-button/WalletBalanceBadge";
import {
  SIDEBAR_GAMES,
  SIDEBAR_LANGUAGE_ICON,
  SIDEBAR_NAVIGATION,
  SIDEBAR_SPACING_VARIANTS,
  SIDEBAR_SUPPORT_ICON,
  type SidebarSpacingVariant,
} from "./constants/sidebar";
import {
  SIDEBAR_FONT_CLASS,
  SIDEBAR_ITEM_TEXT_CLASS,
  SIDEBAR_SECTION_CLASS,
} from "./constants/styles";
import { NavItem } from "./components/NavItem";
import { withSidebarIconSizing } from "./utils/withSidebarIconSizing";

type CelestiumSidebarProps = {
  spacingVariant?: SidebarSpacingVariant;
  user?: UserSnapshot & { isAuthenticated?: boolean };
};

export function CelestiumSidebar({
  spacingVariant = "relaxed",
  user,
}: CelestiumSidebarProps) {
  const { section, nav, footer } = SIDEBAR_SPACING_VARIANTS[spacingVariant];
  const isAuthenticated = user?.isAuthenticated;

  return (
    <div className="flex h-full w-[280px] flex-col overflow-y-auto bg-linear-to-b from-(--celestium-sidebar-bg) via-(--celestium-sidebar-mid) to-(--celestium-sidebar-alt) p-4 text-foreground md:min-h-screen md:overflow-visible sm:p-5">
      <div className="mt-4 sm:mt-6 mb-4 sm:mb-6 flex flex-col gap-3 md:hidden">
        <WalletBalanceBadge
          className="w-full"
          isAuthenticated={isAuthenticated}
        />
        <WalletButton isAuthenticated={isAuthenticated} display="sidebar" />
      </div>
      <div className="mb-4 sm:mb-6">
        <CryptoChart />
      </div>
      <div className="md:hidden mb-4 sm:mb-6">
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <SearchIcon />
          </div>
          <Input
            placeholder="Search"
            className="w-full rounded-lg border-none bg-(--celestium-surface) pl-10 pr-4 py-2.5 text-sm text-(--celestium-muted) placeholder:text-(--celestium-muted) focus-visible:ring-2 focus-visible:ring-(--celestium-surface-hover)"
          />
        </div>
      </div>
      <div className={section}>
        <h3
          className={cn(
            "mb-4 pl-4 text-sm uppercase text-foreground",
            SIDEBAR_SECTION_CLASS
          )}
        >
          Navigation
        </h3>
        <nav className={nav}>
          {SIDEBAR_NAVIGATION.map((item) => (
            <NavItem
              key={item.label}
              icon={createElement(item.icon)}
              label={item.label}
              href={item.href}
            />
          ))}
        </nav>
      </div>
      <div className={section}>
        <h3
          className={cn(
            "mb-4 pl-4 text-sm uppercase text-foreground",
            SIDEBAR_SECTION_CLASS
          )}
        >
          Celestium Games
        </h3>
        <nav className={nav}>
          {SIDEBAR_GAMES.map((item) => (
            <NavItem
              key={item.label}
              icon={createElement(item.icon)}
              label={item.label}
              href={item.href}
            />
          ))}
        </nav>
      </div>
      <div className={footer}>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-muted/50"
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center text-muted-foreground">
              {withSidebarIconSizing(createElement(SIDEBAR_LANGUAGE_ICON))}
            </span>
            <span
              className={cn(
                SIDEBAR_ITEM_TEXT_CLASS,
                "text-muted-foreground",
                SIDEBAR_FONT_CLASS
              )}
            >
              English
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Button>

        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-4 rounded-lg px-4 py-3 text-left transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center text-muted-foreground">
            {withSidebarIconSizing(createElement(SIDEBAR_SUPPORT_ICON))}
          </span>
          <span
            className={cn(
              SIDEBAR_ITEM_TEXT_CLASS,
              "text-muted-foreground",
              SIDEBAR_FONT_CLASS
            )}
          >
            Support
          </span>
        </Button>
      </div>
    </div>
  );
}
