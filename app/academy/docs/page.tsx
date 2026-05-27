import { DOC_CARDS } from "../constants/data";
import AcademyLayout from "../widgets/AcademyLayout";
import { DocCard, type DocCardProps } from "./components/DocCard";



export default function DocsPage() {
  return (
    <AcademyLayout activeResourceId="docs">
      <section className="flex w-full justify-center">
        <div className="grid w-full gap-8 md:grid-cols-3">
          {DOC_CARDS.map((card) => (
            <DocCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </AcademyLayout>
  );
}
