import { cn } from "@/lib/utils";

interface ContentRendererProps {
  content: string;
  className?: string;
}

// Clean markdown symbols from text
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/^#{1,6}\s+/gm, '') // Remove ## headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold**
    .replace(/\*(.*?)\*/g, '$1') // Remove *italic*
    .replace(/`(.*?)`/g, '$1') // Remove `code`
    .replace(/^[-*+]\s+/gm, '• ') // Replace - with bullet
    .replace(/^\d+\.\s+/gm, '') // Remove numbered list markers
    .trim();
};

// Parse content into structured sections
const parseContent = (content: string) => {
  const lines = content.split('\n').filter(line => line.trim());
  const sections: { type: 'heading' | 'subheading' | 'bullet' | 'text'; content: string }[] = [];

  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    // Detect headings (lines that start with ## or are all caps or end with :)
    if (trimmedLine.match(/^#{1,2}\s+/) || 
        (trimmedLine.endsWith(':') && trimmedLine.length < 60 && !trimmedLine.includes('•'))) {
      sections.push({ 
        type: 'heading', 
        content: cleanMarkdown(trimmedLine.replace(/:$/, ''))
      });
    }
    // Detect subheadings (### or smaller)
    else if (trimmedLine.match(/^#{3,6}\s+/)) {
      sections.push({ 
        type: 'subheading', 
        content: cleanMarkdown(trimmedLine)
      });
    }
    // Detect bullet points
    else if (trimmedLine.match(/^[-*+•]\s+/) || trimmedLine.startsWith('•')) {
      sections.push({ 
        type: 'bullet', 
        content: cleanMarkdown(trimmedLine.replace(/^[-*+•]\s*/, ''))
      });
    }
    // Regular text
    else if (trimmedLine.length > 0) {
      sections.push({ 
        type: 'text', 
        content: cleanMarkdown(trimmedLine)
      });
    }
  });

  return sections;
};

export const ContentRenderer = ({ content, className }: ContentRendererProps) => {
  const sections = parseContent(content);

  return (
    <div className={cn("space-y-5", className)}>
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading':
            return (
              <h3 
                key={index} 
                className="font-display text-lg font-semibold text-foreground pt-4 first:pt-0 border-b border-border/30 pb-2"
              >
                {section.content}
              </h3>
            );
          case 'subheading':
            return (
              <h4 
                key={index} 
                className="font-display text-base font-medium text-foreground/90 pt-2"
              >
                {section.content}
              </h4>
            );
          case 'bullet':
            return (
              <div key={index} className="flex gap-3 pl-2">
                <span className="text-primary mt-1.5 text-xs">●</span>
                <p className="text-foreground/80 leading-relaxed flex-1">
                  {section.content}
                </p>
              </div>
            );
          case 'text':
          default:
            return (
              <p 
                key={index} 
                className="text-foreground/80 leading-[1.8] tracking-wide"
              >
                {section.content}
              </p>
            );
        }
      })}
    </div>
  );
};
