import { BookOpen, Lightbulb, Code, Brain } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotesTab } from "./tabs/NotesTab";
import { ExplanationTab } from "./tabs/ExplanationTab";
import { ExamplesTab } from "./tabs/ExamplesTab";
import { QuizTab } from "./tabs/QuizTab";

interface ContentTabsProps {
  topic: string;
  notes: string;
  explanation: string;
  examples: string;
  quiz: { question: string; options: string[]; answer: number }[];
  isLoading: boolean;
}

export const ContentTabs = ({ topic, notes, explanation, examples, quiz, isLoading }: ContentTabsProps) => {
  const tabs = [
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "explanation", label: "Explanation", icon: Lightbulb },
    { id: "examples", label: "Examples", icon: Code },
    { id: "quiz", label: "Quiz", icon: Brain },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-secondary/50 p-1 rounded-xl mb-6">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 rounded-lg py-3 px-4 font-medium transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md"
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="notes" className="mt-0">
          <NotesTab content={notes} isLoading={isLoading} topic={topic} />
        </TabsContent>

        <TabsContent value="explanation" className="mt-0">
          <ExplanationTab content={explanation} isLoading={isLoading} topic={topic} />
        </TabsContent>

        <TabsContent value="examples" className="mt-0">
          <ExamplesTab content={examples} isLoading={isLoading} topic={topic} />
        </TabsContent>

        <TabsContent value="quiz" className="mt-0">
          <QuizTab questions={quiz} isLoading={isLoading} topic={topic} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
