import type { ComponentType } from "react";

import { TrendingUp } from "lucide-react";

import AcademyIcon from "../icons/AcademyIcon";
import AffiliateBinaryIcon from "../icons/AffiliateBinaryIcon";
import BecomePartnerIcon from "../icons/BecomePartnerIcon";
import BlackjackIcon from "../icons/BlackjackIcon";
import FreeCelestiumTokenIcon from "../icons/FreeCelestiumTokenIcon";
import LanguageIcon from "../icons/LanguageIcon";
import PokerIcon from "../icons/PokerIcon";
import RouletteIcon from "../icons/RouletteIcon";
import RoundGamblingIcon from "../icons/RoundGamblingIcon";
import SlotsIcon from "../icons/SlotsIcon";
import SportBettingIcon from "../icons/SportBettingIcon";
import StakingIcon from "../icons/StakingIcon";
import SupportIcon from "../icons/SupportIcon";

export const SIDEBAR_ICON_SIZE = 28;
export const SIDEBAR_FONT_FAMILY = "var(--font-teko), sans-serif";
export const SIDEBAR_FONT_WEIGHT = 400;
export const SIDEBAR_SECTION_FONT_WEIGHT = 500;
export const SIDEBAR_SECTION_LETTER_SPACING = "0.2em";
export const SIDEBAR_SPACING_VARIANTS = {
  relaxed: {
    section: "mb-6 sm:mb-9",
    nav: "space-y-3 sm:space-y-4",
    footer: "mb-4 mt-auto space-y-3 sm:mb-6 sm:space-y-4",
  },
  compact: {
    section: "mb-4 sm:mb-5",
    nav: "space-y-1 sm:space-y-2",
    footer: "mb-3 mt-auto space-y-2 sm:mb-4 sm:space-y-3",
  },
} as const;

export type SidebarSpacingVariant = keyof typeof SIDEBAR_SPACING_VARIANTS;

export type SidebarIconComponent = ComponentType;

export type SidebarNavItem = {
  icon: SidebarIconComponent;
  label: string;
  href?: string;
};

export const SIDEBAR_NAVIGATION: SidebarNavItem[] = [
  { icon: StakingIcon, label: "Staking", href: "/staking" },
  {
    icon: AffiliateBinaryIcon,
    label: "Affiliate & Binnary",
    href: "/genealogy",
  },
  { icon: FreeCelestiumTokenIcon, label: "Free CELESTIUM token" },
  { icon: AcademyIcon, label: "Academy", href: "/academy" },
  { icon: BecomePartnerIcon, label: "Become a partner" },
];

export const SIDEBAR_GAMES: SidebarNavItem[] = [
  { icon: TrendingUp, label: "Crypto predict" },
  { icon: SportBettingIcon, label: "Sport Betting" },
  { icon: RoundGamblingIcon, label: "Round Gambling", href: "/round-gambling" },
  { icon: RouletteIcon, label: "Roulette", href: "/roulette" },
  { icon: PokerIcon, label: "Poker" },
  { icon: BlackjackIcon, label: "Blackjack" },
  { icon: SlotsIcon, label: "Slots" },
];

export const SIDEBAR_LANGUAGE_ICON = LanguageIcon;
export const SIDEBAR_SUPPORT_ICON = SupportIcon;
