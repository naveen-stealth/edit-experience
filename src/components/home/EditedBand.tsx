import { Container } from "@/components/ui/Container";

export function EditedBand({ statement, caption }: { statement: string; caption: string }) {
  return (
    <div className="border-y border-pine-12 bg-ivory py-14 tablet:py-16">
      <Container>
        {/* Capped for measure: the statement is the one centred pull-quote on the
            page, and unbounded it ran to ~200 characters per line at 1728px. */}
        <div className="mx-auto max-w-[34ch] text-center tablet:max-w-[46ch]">
          <p className="font-serif text-title-sm text-pine tablet:text-title">{statement}</p>
          <p className="mt-3.5 text-caption text-pine-45">{caption}</p>
        </div>
      </Container>
    </div>
  );
}
