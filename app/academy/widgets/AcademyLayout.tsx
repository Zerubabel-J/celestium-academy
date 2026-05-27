import { ReactNode } from "react";
import {
  ACADEMY_PAGE_CLASS,
  ACADEMY_WRAPPER_CLASS,
  ACADEMY_HEADER_CLASS,
  ACADEMY_TITLE_CLASS,
  ACADEMY_SCORE_CLASS,
  ACADEMY_PROGRESS,
} from "../constants/academy";
import AcademyResourceNav from "./AcademyResourceNav";

type AcademyLayoutProps = {
  children: ReactNode;
  activeResourceId?: string;
};

export default function AcademyLayout({
  children,
  activeResourceId = "for-newbies",
}: AcademyLayoutProps) {
  return (
    <div className={ACADEMY_PAGE_CLASS}>
      <div className={ACADEMY_WRAPPER_CLASS}>
        <div className="mb-12">
          <AcademyResourceNav activeResourceId={activeResourceId} />
        </div>

        <header className={ACADEMY_HEADER_CLASS}>
          <h1 className={ACADEMY_TITLE_CLASS}>CELESTIUM ACADEMY</h1>
          <p className={ACADEMY_SCORE_CLASS}>
            <span className="font-normal text-academy-accent">
              {ACADEMY_PROGRESS.score}
            </span>
            <span className="ml-2 text-[20px] text-academy-muted">
              / {ACADEMY_PROGRESS.total}
            </span>
            <span className="ml-2 text-[20px] text-white">
              {ACADEMY_PROGRESS.label}
            </span>
          </p>
        </header>

        {children}
      </div>
    </div>
  );
}
