"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CelestiumSidebar } from "@/components/custom/sidebar/CelestiumSidebar";
import type { UserSnapshot } from "@/types/user";

import { X } from "lucide-react";
import { SearchIcon } from "./icons/SearchIcon";
import { BellIcon } from "./icons/BellIcon";
import { MenuIcon } from "./icons/MenuIcon";
import { WalletButton } from "../wallet-button/WalletButton";
import { WalletBalanceBadge } from "../wallet-button/WalletBalanceBadge";

type NavbarProps = {
  user: UserSnapshot & { isAuthenticated?: boolean };
};

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-(--celestium-navbar-border) bg-(--celestium-navbar-bg) py-3 backdrop-blur-md left-0 right-0">
        <div className="relative flex items-center justify-between gap-4 md:gap-6 px-4 md:px-6 max-w-full overflow-x-hidden">
          <Link href="/" className="shrink-0">
            <Image
              src="/celestium-con-nobg.webp"
              alt="Celestium Logo"
              width={80}
              height={32}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex-1 flex items-center justify-end md:justify-between md:pl-36">
            <div className="hidden md:flex flex-1 max-w-sm">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <SearchIcon className="size-4" />
                </div>
                <Input
                  placeholder="Search"
                  className="w-full rounded-lg border-none bg-(--celestium-surface) pl-10 pr-4 py-2.5 text-sm text-(--celestium-muted) placeholder:text-(--celestium-muted) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--celestium-surface-hover)"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex rounded-lg text-(--celestium-muted) transition-colors hover:bg-(--celestium-surface) hover:text-white"
                aria-label="Notifications"
              >
                <BellIcon className="size-6" />
              </Button>

              <WalletBalanceBadge
                className="hidden md:flex"
                isAuthenticated={user.isAuthenticated}
              />

              <WalletButton
                isAuthenticated={user.isAuthenticated}
                display="desktop"
              />

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-lg text-white transition-colors hover:bg-(--celestium-surface)"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="size-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed left-0 top-16 bottom-0 z-40 w-64 bg-(--celestium-sidebar-bg) transform transition-transform duration-300 md:hidden -translate-x-[110%]",
          mobileMenuOpen && "translate-x-0"
        )}
      >
        <CelestiumSidebar user={user} />
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
