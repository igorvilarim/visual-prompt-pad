import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface PromptCardProps {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

export const PromptCard = ({ title, content, category, createdAt }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({
        title: "Prompt copiado!",
        description: "O prompt foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o prompt.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="group transition-all duration-200 hover:shadow-[var(--shadow-hover)] border-0 bg-card shadow-[var(--shadow-card)]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-apple-blue bg-apple-blue/10 px-2 py-1 rounded-full">
                {category}
              </span>
              <span className="text-xs text-muted-foreground">
                {createdAt.toLocaleDateString('pt-BR')}
              </span>
            </div>
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {title}
            </h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0 hover:bg-apple-gray-light"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};