import { Brain, CheckCircle, XCircle, Shuffle } from "lucide-react";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentSkeleton } from "../ContentSkeleton";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface QuizTabProps {
  questions: QuizQuestion[];
  isLoading: boolean;
  topic: string;
}

// Shuffle array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const QuizTab = ({ questions, isLoading, topic }: QuizTabProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Shuffle questions when shuffleKey changes
  const shuffledQuestions = useMemo(() => {
    return shuffleArray(questions);
  }, [questions, shuffleKey]);

  if (isLoading) {
    return <ContentSkeleton />;
  }

  if (!questions || questions.length === 0) {
    return (
      <Card className="glass-card p-10 text-center">
        <Brain className="w-14 h-14 mx-auto text-muted-foreground/50 mb-5" />
        <p className="text-muted-foreground text-lg">Search a topic to test your knowledge</p>
      </Card>
    );
  }

  const handleAnswer = (index: number) => {
    if (answered[currentQuestion]) return;
    
    setSelectedAnswer(index);
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);
    
    if (index === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
    setShuffleKey(prev => prev + 1); // Trigger reshuffle
  };

  if (showResult) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <Card className="glass-card p-10 text-center animate-scale-in">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-3xl font-display font-bold text-primary-foreground">{percentage}%</span>
        </div>
        <h3 className="font-display text-2xl font-bold mb-3">Quiz Complete</h3>
        <p className="text-muted-foreground text-lg mb-8">
          You scored {score} out of {shuffledQuestions.length} questions correctly
        </p>
        <Button onClick={handleRestart} className="bg-gradient-to-r from-primary to-accent px-8 py-3 gap-2">
          <Shuffle className="w-4 h-4" />
          Try Again (Shuffled)
        </Button>
      </Card>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const isAnswered = answered[currentQuestion];

  return (
    <Card className="glass-card p-8 animate-scale-in">
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
            <Brain className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-xl">Quiz</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{topic}</p>
          </div>
        </div>
        <div className="text-base font-medium text-muted-foreground">
          {currentQuestion + 1} / {shuffledQuestions.length}
        </div>
      </div>

      <div className="mb-8">
        <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <h4 className="font-display text-xl font-semibold mb-8 leading-relaxed">{question.question}</h4>

      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => {
          const isCorrect = index === question.answer;
          const isSelected = selectedAnswer === index;
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={cn(
                "w-full p-5 text-left rounded-xl border-2 transition-all duration-200",
                !isAnswered && "hover:border-primary hover:bg-primary/5",
                !isAnswered && "border-border bg-card",
                isAnswered && isCorrect && "border-success bg-success/10",
                isAnswered && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                isAnswered && !isSelected && !isCorrect && "border-border bg-card opacity-50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-base">{option}</span>
                {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-success" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
              </div>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <Button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-primary to-accent py-3 text-base"
        >
          {currentQuestion < shuffledQuestions.length - 1 ? "Next Question" : "See Results"}
        </Button>
      )}
    </Card>
  );
};
