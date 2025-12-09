import { Search, Sparkles } from "lucide-react";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="relative flex items-center gap-2 bg-card border border-border rounded-xl p-2 shadow-lg">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <Input
            type="text"
            placeholder="Search any topic... (e.g., Quantum Physics, Machine Learning, History)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-lg px-6 font-semibold transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Learn</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
