import { PromptCard } from "./PromptCard";

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

interface PromptFeedProps {
  prompts: Prompt[];
  activeCategory: string | null;
}

export const PromptFeed = ({ prompts, activeCategory }: PromptFeedProps) => {
  const filteredPrompts = activeCategory
    ? prompts.filter((prompt) => prompt.category === activeCategory)
    : prompts;

  const sortedPrompts = filteredPrompts.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  if (sortedPrompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-apple-gray-light rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Nenhum prompt encontrado
        </h3>
        <p className="text-muted-foreground max-w-sm">
          {activeCategory
            ? "Não há prompts nesta categoria. Que tal adicionar o primeiro?"
            : "Você ainda não tem prompts salvos. Clique no botão + para começar."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedPrompts.map((prompt) => (
        <PromptCard key={prompt.id} {...prompt} />
      ))}
    </div>
  );
};