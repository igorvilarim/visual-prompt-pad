import { useState } from "react";
import { Folder, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  activeCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onCategoryAdd: (name: string) => void;
}

export const CategoryList = ({ 
  categories, 
  activeCategory, 
  onCategorySelect, 
  onCategoryAdd 
}: CategoryListProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onCategoryAdd(newCategoryName.trim());
      setNewCategoryName("");
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewCategoryName("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Categorias</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="h-6 w-6 p-0 hover:bg-apple-gray-light"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Categoria "Todos" */}
      <Button
        variant="ghost"
        onClick={() => onCategorySelect(null)}
        className={`w-full justify-start h-8 px-2 text-sm font-normal ${
          activeCategory === null
            ? "bg-apple-blue text-white hover:bg-apple-blue/90"
            : "hover:bg-apple-gray-light text-foreground"
        }`}
      >
        <Folder className="h-4 w-4 mr-2" />
        Todos
        <Badge variant="secondary" className="ml-auto text-xs">
          {categories.reduce((total, cat) => total + cat.count, 0)}
        </Badge>
      </Button>

      {/* Lista de categorias */}
      <div className="space-y-1">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            onClick={() => onCategorySelect(category.id)}
            className={`w-full justify-start h-8 px-2 text-sm font-normal ${
              activeCategory === category.id
                ? "bg-apple-blue text-white hover:bg-apple-blue/90"
                : "hover:bg-apple-gray-light text-foreground"
            }`}
          >
            <Folder className="h-4 w-4 mr-2" />
            {category.name}
            <Badge variant="secondary" className="ml-auto text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Input para nova categoria */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nome da categoria"
            className="h-8 text-sm"
            autoFocus
          />
          <div className="flex gap-1">
            <Button
              type="submit"
              size="sm"
              className="h-6 px-2 text-xs bg-apple-blue hover:bg-apple-blue/90"
            >
              Adicionar
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-6 px-2 text-xs hover:bg-apple-gray-light"
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};