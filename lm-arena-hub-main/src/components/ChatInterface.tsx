import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Copy, Settings, Image as ImageIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { puterAI } from "@/services/puterAI";
import { ModelSelector } from "./ModelSelector";
import type { ChatMessage, Model } from "@/types/global";

interface ChatInterfaceProps {
  selectedModel?: Model | null;
}

export function ChatInterface({ selectedModel: initialModel }: ChatInterfaceProps) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(initialModel || null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([500]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة رسالة",
        variant: "destructive"
      });
      return;
    }

    if (!selectedModel) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار نموذج أولاً",
        variant: "destructive"
      });
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      // Check if streaming is supported
      const useStreaming = temperature[0] > 0.5; // Use streaming for more creative responses
      
      if (useStreaming) {
        setIsStreaming(true);
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "",
          timestamp: new Date(),
          model: selectedModel.name
        };
        
        setMessages(prev => [...prev, assistantMessage]);

        const stream = await puterAI.generateTextStream(
          currentMessage, 
          selectedModel.id, 
          { 
            temperature: temperature[0], 
            max_tokens: maxTokens[0] 
          }
        );

        let fullResponse = "";
        for await (const part of stream) {
          const text = part?.text || "";
          fullResponse += text;
          
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content: fullResponse }
              : msg
          ));
        }
        
        setIsStreaming(false);
      } else {
        // Regular generation
        const response = await puterAI.generateText(
          currentMessage, 
          selectedModel.id, 
          { 
            temperature: temperature[0], 
            max_tokens: maxTokens[0] 
          }
        );

        const responseText = typeof response === 'string' ? response : 
                           response?.message?.content?.[0]?.text || response?.text || 'حدث خطأ في الاستجابة';

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseText,
          timestamp: new Date(),
          model: selectedModel.name
        };

        setMessages(prev => [...prev, assistantMessage]);
      }

      toast({
        title: "تم إرسال الرسالة بنجاح! 💬",
        description: `استجابة من ${selectedModel.name}`,
      });

    } catch (error) {
      console.error('Chat error:', error);
      
      // Add fallback response instead of error
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `هذه استجابة تجريبية من ${selectedModel.name} للرسالة: "${currentMessage}"\n\nفي الوضع العادي مع Puter.js، ستحصل على استجابة حقيقية من النموذج المختار. تأكد من تحميل Puter.js بشكل صحيح والاتصال بالإنترنت.`,
        timestamp: new Date(),
        model: `${selectedModel.name} (تجريبي)`
      };

      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        title: "وضع تجريبي",
        description: "يتم عرض استجابة تجريبية. للحصول على استجابات حقيقية، تأكد من تحميل Puter.js.",
        variant: "default"
      });
    }

    setIsLoading(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    toast({
      title: "تم مسح المحادثة",
      description: "تم حذف جميع الرسائل",
    });
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "تم النسخ",
      description: "تم نسخ الرسالة إلى الحافظة",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="battle-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold gradient-text mb-2">💬 محادثة مباشرة مع النماذج</h2>
              <p className="text-muted-foreground">
                تحدث مباشرة مع أقوى النماذج اللغوية مجاناً
              </p>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelSelect={setSelectedModel}
                  placeholder="اختر النموذج للمحادثة"
                  className="h-12"
                />
              </div>
              
              <Button
                onClick={() => setShowSettings(!showSettings)}
                variant="outline"
                size="sm"
                className="border-border hover:bg-accent/50"
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              {messages.length > 0 && (
                <Button
                  onClick={handleClearChat}
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-accent/50"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="p-4 bg-accent/20 rounded-lg border border-accent/30 space-y-4">
                <h3 className="font-medium">إعدادات التوليد</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>درجة الإبداع (Temperature): {temperature[0]}</Label>
                    <Slider
                      value={temperature}
                      onValueChange={setTemperature}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      0 = أكثر دقة، 1 = أكثر إبداعاً
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>الحد الأقصى للكلمات: {maxTokens[0]}</Label>
                    <Slider
                      value={maxTokens}
                      onValueChange={setMaxTokens}
                      max={2000}
                      min={50}
                      step={50}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      عدد الكلمات في الاستجابة
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="battle-card">
        <CardContent className="p-0">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-20">
                <div className="text-6xl mb-4">💬</div>
                <p>ابدأ محادثة جديدة مع النموذج المختار</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/50 text-foreground'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="whitespace-pre-wrap" dir="rtl">
                          {message.content}
                        </p>
                        {message.model && (
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {message.model}
                            </Badge>
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString('ar-SA')}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyMessage(message.content)}
                        className="opacity-50 hover:opacity-100 shrink-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isStreaming && (
              <div className="flex justify-start">
                <div className="bg-accent/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full loading-dots"></div>
                      <div className="w-2 h-2 bg-current rounded-full loading-dots"></div>
                      <div className="w-2 h-2 bg-current rounded-full loading-dots"></div>
                    </div>
                    جاري الكتابة...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card className="battle-card">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={selectedModel ? `اكتب رسالتك لـ ${selectedModel.name}...` : "اختر نموذجاً أولاً..."}
                className="min-h-[60px] bg-background border-border resize-none"
                maxLength={2000}
                dir="rtl"
                disabled={!selectedModel}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !currentMessage.trim() || !selectedModel}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
                size="sm"
              >
                {isLoading ? (
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                    <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                    <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                  </div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
              {temperature[0] > 0.5 && (
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 ml-1" />
                  تدفق
                </Badge>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-left">
            {currentMessage.length}/2000 • اضغط Enter للإرسال
          </div>
        </CardContent>
      </Card>
    </div>
  );
}