import { useState } from "react";
import { ChevronDown, Sparkles, Zap, Brain, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { puterAI } from "@/services/puterAI";

export interface Model {
  id: string;
  name: string;
  provider: string;
  type: 'text' | 'image' | 'multimodal';
  capabilities: string[];
  icon: string;
  isNew?: boolean;
}

interface ModelSelectorProps {
  selectedModel: Model | null;
  onModelSelect: (model: Model) => void;
  placeholder?: string;
  className?: string;
}

export function ModelSelector({ selectedModel, onModelSelect, placeholder = "اختر نموذجاً", className = "" }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'text' | 'multimodal' | 'image'>('all');

  const models = puterAI.getAvailableModels();
  const filteredModels = filter === 'all' ? models : models.filter(model => model.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <Zap className="w-4 h-4" />;
      case 'multimodal': return <Brain className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-500/20 text-blue-400';
      case 'multimodal': return 'bg-purple-500/20 text-purple-400';
      case 'image': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'text': return 'نصوص';
      case 'multimodal': return 'متعدد الوسائط';
      case 'image': return 'صور';
      default: return 'عام';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between border-border hover:bg-accent/50"
      >
        {selectedModel ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedModel.icon}</span>
            <div className="text-right">
              <div className="font-medium">{selectedModel.name}</div>
              <div className="text-xs text-muted-foreground">{selectedModel.provider}</div>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-2 battle-card border-border">
          <CardContent className="p-4">
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={filter === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
                className="text-xs"
              >
                الكل
              </Button>
              <Button
                variant={filter === 'text' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('text')}
                className="text-xs"
              >
                نصوص
              </Button>
              <Button
                variant={filter === 'multimodal' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('multimodal')}
                className="text-xs"
              >
                متعدد الوسائط
              </Button>
              <Button
                variant={filter === 'image' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('image')}
                className="text-xs"
              >
                صور
              </Button>
            </div>

            {/* Models List */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  onClick={() => {
                    onModelSelect(model);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <div className="text-2xl">{model.icon}</div>
                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{model.name}</span>
                      {model.isNew && (
                        <Badge variant="secondary" className="text-xs bg-success/20 text-success">
                          جديد
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{model.provider}</div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getTypeColor(model.type)}`}>
                        {getTypeIcon(model.type)}
                        <span className="mr-1">{getTypeName(model.type)}</span>
                      </Badge>
                      <div className="flex gap-1">
                        {model.capabilities.slice(0, 2).map((cap) => (
                          <Badge key={cap} variant="secondary" className="text-xs">
                            {cap}
                          </Badge>
                        ))}
                        {model.capabilities.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{model.capabilities.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredModels.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد نماذج متاحة في هذه الفئة
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}