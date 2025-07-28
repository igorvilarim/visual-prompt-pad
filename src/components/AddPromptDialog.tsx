import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface AddPromptDialogProps {
  categories: Category[];
  onPromptAdd: (prompt: {
    title: string;
    content: string;
    category: string;
  }) => void;
}

export const AddPromptDialog = ({ categories, onPromptAdd }: AddPromptDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && selectedCategory) {
      onPromptAdd({
        title: title.trim(),
        content: content.trim(),
        category: selectedCategory,
      });
      setTitle("");
      setContent("");
      setSelectedCategory("");
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedCategory("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-10 w-10 rounded-full bg-apple-blue hover:bg-apple-blue/90 shadow-lg hover:shadow-xl transition-all duration-200"
          size="sm"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Novo Prompt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Título
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite um título para o prompt"
              className="text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Categoria
            </Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              Conteúdo do Prompt
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite o conteúdo do seu prompt aqui..."
              className="min-h-[200px] text-sm resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="hover:bg-apple-gray-light"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-apple-blue hover:bg-apple-blue/90"
            >
              Salvar Prompt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};