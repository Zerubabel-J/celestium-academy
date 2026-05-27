import type { Metadata } from "next";
import "./globals.css";
import { CelestiumSidebar } from "@/components/custom/sidebar/CelestiumSidebar";
import { Abel, Teko } from "next/font/google";
import localFont from "next/font/local";
import { Navbar } from "@/components/custom/navbar/Navbar";
import { getServerUser } from "@/lib/auth";
import AppKitProvider from "@/context/AppKitProvider";

const abel = Abel({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abel",
});

const teko = Teko({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-teko",
});

const waitingForTheSunrise = localFont({
  src: [
    {
      path: "../public/fonts/WaitingfortheSunrise.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-waiting-for-the-sunrise",
  fallback: ["cursive"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Celestium",
  description: "Responsive dashboard with TailwindCSS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerUser();
  const walletLabel = session?.address
    ? `${session.address.slice(0, 6)}…${session.address.slice(-4)}`
    : "Not signed";

  const user = {
    balanceLabel: "-",
    walletLabel,
    isAuthenticated: Boolean(session),
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`bg-[#0a0e1a] text-foreground font-sans antialiased overflow-x-hidden ${abel.variable} ${teko.variable} ${waitingForTheSunrise.variable}`}
      >
        <AppKitProvider>
          <Navbar user={user} />

          <div className="flex pt-16 min-h-screen overflow-x-hidden">
            <div className="hidden md:block">
              <CelestiumSidebar user={user} />
            </div>
            <main className="flex-1 bg-[#0a0e1a] overflow-x-hidden w-full min-w-0">
              {children}
            </main>
          </div>
        </AppKitProvider>
      </body>
    </html>
  );
}
