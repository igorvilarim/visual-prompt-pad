import { useState } from "react";
import { AddPromptDialog } from "@/components/AddPromptDialog";
import { CategoryList } from "@/components/CategoryList";
import { PromptFeed } from "@/components/PromptFeed";
import { toast } from "@/hooks/use-toast";

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

const Index = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: "1",
      title: "Prompt de Criação de Conteúdo",
      content: "Você é um especialista em marketing digital. Crie um post para Instagram sobre [TÓPICO] que seja engajador, use emojis apropriados e inclua hashtags relevantes. O post deve ter um tom [INSERIR_TOM] e ser direcionado para [PÚBLICO_ALVO].",
      category: "marketing",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Análise de Código",
      content: "Analise este código e identifique possíveis melhorias em termos de performance, legibilidade e boas práticas. Forneça sugestões específicas e explique o raciocínio por trás de cada recomendação.\n\n[INSERIR_CÓDIGO_AQUI]",
      category: "programacao",
      createdAt: new Date("2024-01-14"),
    },
    {
      id: "3",
      title: "Prompt para Redação Criativa",
      content: "Escreva uma história curta de aproximadamente 300 palavras sobre [TEMA]. A história deve incluir:\n- Um protagonista interessante\n- Um conflito central\n- Uma reviravolta no final\n- Um tom [INSERIR_TOM]\n\nFoque em criar uma narrativa envolvente que prenda o leitor do início ao fim.",
      category: "escrita",
      createdAt: new Date("2024-01-13"),
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: "marketing", name: "Marketing", count: 1 },
    { id: "programacao", name: "Programação", count: 1 },
    { id: "escrita", name: "Escrita Criativa", count: 1 },
  ]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handlePromptAdd = (newPrompt: {
    title: string;
    content: string;
    category: string;
  }) => {
    const prompt: Prompt = {
      id: Date.now().toString(),
      ...newPrompt,
      createdAt: new Date(),
    };

    setPrompts((prev) => [prompt, ...prev]);

    // Atualizar contagem da categoria
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === newPrompt.category
          ? { ...cat, count: cat.count + 1 }
          : cat
      )
    );

    toast({
      title: "Prompt adicionado!",
      description: "Seu novo prompt foi salvo com sucesso.",
    });
  };

  const handleCategoryAdd = (name: string) => {
    const category: Category = {
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      count: 0,
    };

    setCategories((prev) => [...prev, category]);

    toast({
      title: "Categoria criada!",
      description: `A categoria "${name}" foi adicionada.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 lg:min-h-screen bg-gradient-to-b from-muted/40 to-muted/20 border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-6 space-y-6">
          {/* Header da sidebar */}
          <div className="text-center lg:text-left">
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Visual Prompt Pad
            </h2>
            <p className="text-xs text-muted-foreground">
              Organize seus prompts
            </p>
          </div>

          {/* Botão de adicionar prompt */}
          <div className="flex justify-center lg:justify-start">
            <AddPromptDialog
              categories={categories}
              onPromptAdd={handlePromptAdd}
            />
          </div>

          {/* Lista de categorias */}
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            onCategorySelect={setActiveCategory}
            onCategoryAdd={handleCategoryAdd}
          />
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto p-4 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {activeCategory
                  ? categories.find((cat) => cat.id === activeCategory)?.name || "Categoria"
                  : "Todos os Prompts"}
              </h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                {activeCategory
                  ? `Prompts da categoria selecionada`
                  : "Organize e gerencie seus prompts favoritos em um só lugar."}
              </p>
            </div>

            {/* Feed de prompts */}
            <PromptFeed prompts={prompts} activeCategory={activeCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
