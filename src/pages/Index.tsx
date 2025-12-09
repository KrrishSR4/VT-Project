import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ContentTabs } from "@/components/ContentTabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Globe, Zap } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

const Index = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [explanation, setExplanation] = useState("");
  const [examples, setExamples] = useState("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);

  const generateContent = async (searchTopic: string, type: string) => {
    const { data, error } = await supabase.functions.invoke("generate-content", {
      body: { topic: searchTopic, type },
    });

    if (error) {
      console.error(`Error generating ${type}:`, error);
      throw error;
    }

    return data.content;
  };

  const handleSearch = async (searchQuery: string) => {
    setTopic(searchQuery);
    setIsLoading(true);
    setNotes("");
    setExplanation("");
    setExamples("");
    setQuiz([]);

    try {
      toast({
        title: "Generating content...",
        description: `Learning about "${searchQuery}"`,
      });

      // Generate all content types in parallel
      const [notesContent, explanationContent, examplesContent, quizContent] = await Promise.all([
        generateContent(searchQuery, "notes"),
        generateContent(searchQuery, "explanation"),
        generateContent(searchQuery, "examples"),
        generateContent(searchQuery, "quiz"),
      ]);

      setNotes(notesContent);
      setExplanation(explanationContent);
      setExamples(examplesContent);

      // Parse quiz JSON
      try {
        const cleanedQuiz = quizContent.replace(/```json\n?|\n?```/g, "").trim();
        const parsedQuiz = JSON.parse(cleanedQuiz);
        setQuiz(parsedQuiz);
      } catch (e) {
        console.error("Failed to parse quiz:", e);
        setQuiz([]);
      }

      toast({
        title: "Content ready!",
        description: "Explore notes, explanation, examples, and quiz",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasContent = notes || explanation || examples || quiz.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-4 pb-12">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Learning Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
            Learn <span className="gradient-text">Any Topic</span>
            <br />
            <span className="text-foreground">Instantly</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up stagger-1">
            Search any subject worldwide and get comprehensive notes, explanations, 
            real-world examples, and interactive quizzes powered by AI.
          </p>

          <div className="animate-slide-up stagger-2">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {!hasContent && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up stagger-3">
              <FeatureCard
                icon={GraduationCap}
                title="Comprehensive Notes"
                description="Get structured study notes for any subject"
              />
              <FeatureCard
                icon={Globe}
                title="Global Topics"
                description="Learn about anything from around the world"
              />
              <FeatureCard
                icon={Zap}
                title="Interactive Quiz"
                description="Test your knowledge with AI-generated quizzes"
              />
            </div>
          )}
        </section>

        {/* Content Section */}
        {(hasContent || isLoading) && (
          <section className="mt-8">
            <ContentTabs
              topic={topic}
              notes={notes}
              explanation={explanation}
              examples={examples}
              quiz={quiz}
              isLoading={isLoading}
            />
          </section>
        )}
      </main>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="glass-card rounded-xl p-6 hover-lift">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Index;
