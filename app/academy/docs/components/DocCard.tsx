import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DocCardProps = {
  title: string;
  sections: string[];
  visitHref: string;
  visitLabel?: string;
  playHref?: string;
  playLabel?: string;
  className?: string;
};

export function DocCard({
  title,
  sections,
  visitHref,
  visitLabel = "Visit",
  playHref,
  playLabel = "Play",
  className,
}: DocCardProps) {
  return (
    <article
      className={cn(
        "flex min-h-72 flex-col rounded-2xl border border-[#2a3142] bg-[#161a25] p-8 shadow-[0_20px_45px_-25px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="mb-8 flex min-h-52 items-start gap-6">
        <FileText className="size-11 shrink-0 text-[#6A6A9F] stroke-[1.5]" />
        <div className="flex-1">
          <h2 className="mb-5 min-h-12 text-2xl tracking-wide text-white">
            {title}
          </h2>
          <ul className="min-h-32 space-y-3 text-[#7a8299]">
            {sections.map((section) => (
              <li
                key={section}
                className="flex items-center gap-3 text-sm sm:text-base"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-[#7a8299]" />
                <span>{section}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8 h-px bg-[#2a3142]" />

      <div className="mt-auto flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="h-14 w-72 sm:w-auto sm:flex-1 border-2 border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37]/10 hover:text-[#d4af37] focus-visible:ring-[#d4af37]/30"
        >
          <Link href={visitHref} target="_blank" rel="noreferrer">
            {visitLabel}
          </Link>
        </Button>

        <Button
          size="lg"
          asChild={Boolean(playHref)}
          className="h-14 w-72 sm:w-auto sm:flex-1 bg-[#f4c430] text-[#0f1419] hover:bg-[#f4c430]/90 focus-visible:ring-[#f4c430]/35"
        >
          {playHref ? (
            <Link href={playHref} target="_blank" rel="noreferrer">
              {playLabel}
            </Link>
          ) : (
            <span>{playLabel}</span>
          )}
        </Button>
      </div>
    </article>
  );
}
