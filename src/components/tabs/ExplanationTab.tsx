import { Lightbulb, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentSkeleton } from "../ContentSkeleton";
import { ContentRenderer } from "../ContentRenderer";
import { usePdfDownload } from "@/hooks/use-pdf-download";

interface ExplanationTabProps {
  content: string;
  isLoading: boolean;
  topic: string;
}

export const ExplanationTab = ({ content, isLoading, topic }: ExplanationTabProps) => {
  const { downloadAsPdf } = usePdfDownload();

  if (isLoading) {
    return <ContentSkeleton />;
  }

  if (!content) {
    return (
      <Card className="glass-card p-10 text-center">
        <Lightbulb className="w-14 h-14 mx-auto text-muted-foreground/50 mb-5" />
        <p className="text-muted-foreground text-lg">Search a topic to get a detailed explanation</p>
      </Card>
    );
  }

  return (
    <Card className="glass-card p-8 animate-scale-in">
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-xl">Explanation</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{topic}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadAsPdf(content, "Explanation", topic)}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>
      <ContentRenderer content={content} />
    </Card>
  );
};
