import { useState } from "react";
import { Send, RotateCcw, Copy, ThumbsUp, ThumbsDown, Equal, X, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { puterAI } from "@/services/puterAI";
import type { BattleResult } from "@/types/global";

interface BattleInterfaceProps {
  onBattleComplete?: (result: BattleResult) => void;
}

export function BattleInterface({ onBattleComplete }: BattleInterfaceProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<'A' | 'B' | 'tie' | 'both_bad' | null>(null);

  const handleStartBattle = async () => {
    if (!prompt.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة سؤال أو مطالبة",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setHasVoted(false);
    setSelectedWinner(null);

    try {
      // Get random models for battle
      const textModels = puterAI.getModelsByType('text').concat(puterAI.getModelsByType('multimodal'));
      const shuffled = [...textModels].sort(() => 0.5 - Math.random());
      const modelA = shuffled[0] || { id: 'gpt-5', name: 'GPT-5' };
      const modelB = shuffled[1] || { id: 'claude-sonnet-4', name: 'Claude Sonnet 4' };

      // Generate responses from both models simultaneously
      const [responseA, responseB] = await Promise.all([
        puterAI.generateText(prompt, modelA.id, { temperature: 0.7, max_tokens: 500 }),
        puterAI.generateText(prompt, modelB.id, { temperature: 0.7, max_tokens: 500 })
      ]);

      // Extract text from responses
      const textA = typeof responseA === 'string' ? responseA : 
                   responseA?.message?.content?.[0]?.text || responseA?.text || 'حدث خطأ في الاستجابة';
      const textB = typeof responseB === 'string' ? responseB : 
                   responseB?.message?.content?.[0]?.text || responseB?.text || 'حدث خطأ في الاستجابة';

      const result: BattleResult = {
        modelA: "نموذج A", // Hide model names until voting
        modelB: "نموذج B",
        responseA: textA,
        responseB: textB,
        prompt: prompt
      };

      // Store actual model names for reveal after voting
      (result as any).actualModelA = modelA.name;
      (result as any).actualModelB = modelB.name;

      setBattleResult(result);
      
      toast({
        title: "تمت المعركة بنجاح! ⚔️",
        description: "تم توليد الإجابات من نموذجين مختلفين",
      });

    } catch (error) {
      console.error('Battle error:', error);
      
      // Always show demo responses as fallback
      const result: BattleResult = {
        modelA: "نموذج A",
        modelB: "نموذج B", 
        responseA: `إجابة تجريبية للسؤال: "${prompt}"\n\nهذه استجابة من النموذج الأول. في الوضع العادي مع Puter.js، ستحصل على إجابة حقيقية من GPT-5 أو أحد النماذج المتقدمة الأخرى.`,
        responseB: `إجابة تجريبية أخرى للسؤال: "${prompt}"\n\nهذه استجابة من النموذج الثاني. تأكد من تحميل Puter.js بشكل صحيح والاتصال بالإنترنت للحصول على إجابات حقيقية من Claude أو النماذج الأخرى.`,
        prompt: prompt
      };
      
      // Store demo model names
      (result as any).actualModelA = "GPT-5 (تجريبي)";
      (result as any).actualModelB = "Claude Sonnet 4 (تجريبي)";
      
      setBattleResult(result);
      
      toast({
        title: "وضع تجريبي",
        description: "يتم عرض إجابات تجريبية. للحصول على إجابات حقيقية، تأكد من تحميل Puter.js.",
        variant: "default"
      });
    }

    setIsLoading(false);
  };

  const handleVote = (winner: 'A' | 'B' | 'tie' | 'both_bad') => {
    setSelectedWinner(winner);
    setHasVoted(true);
    
    // Show actual model names after voting
    setTimeout(() => {
      if (battleResult) {
        const updatedResult = {
          ...battleResult,
          modelA: (battleResult as any).actualModelA || "GPT-4o",
          modelB: (battleResult as any).actualModelB || "Claude Sonnet 4"
        };
        setBattleResult(updatedResult);
        onBattleComplete?.(updatedResult);
      }
    }, 500);

    toast({
      title: "تم تسجيل التصويت",
      description: "شكراً لمشاركتك في تقييم النماذج",
      variant: "default"
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: "تم نسخ النص إلى الحافظة",
    });
  };

  const handleReset = () => {
    setPrompt("");
    setBattleResult(null);
    setHasVoted(false);
    setSelectedWinner(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Prompt Input */}
      <Card className="battle-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold gradient-text mb-2">⚔️ ساحة المعركة</h2>
              <p className="text-muted-foreground">
                اكتب سؤالك وشاهد كيف يجيب نموذجان مختلفان، ثم صوت للأفضل
              </p>
            </div>
            
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="اكتب سؤالك أو مطالبتك هنا... (مثال: اشرح لي مفهوم الذكاء الاصطناعي)"
                className="min-h-[120px] bg-background border-border resize-none text-lg"
                maxLength={2000}
                dir="rtl"
              />
              <div className="absolute bottom-3 left-3 text-xs text-muted-foreground">
                {prompt.length}/2000
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleStartBattle}
                disabled={isLoading || !prompt.trim()}
                className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                      <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                      <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                    </div>
                    جاري المعالجة...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 ml-2" />
                    ابدأ المعركة
                  </>
                )}
              </Button>
              
              {battleResult && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-accent/50"
                >
                  <RotateCcw className="w-4 h-4 ml-2" />
                  معركة جديدة
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Battle Results */}
      {battleResult && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Model A Response */}
          <Card className="battle-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-arena-blue rounded-full"></div>
                  <h3 className="font-semibold text-lg">
                    {hasVoted ? battleResult.modelA : "النموذج A"}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(battleResult.responseA)}
                  className="hover:bg-accent/50"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground leading-relaxed" dir="rtl">
                  {battleResult.responseA}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Model B Response */}
          <Card className="battle-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-arena-red rounded-full"></div>
                  <h3 className="font-semibold text-lg">
                    {hasVoted ? battleResult.modelB : "النموذج B"}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(battleResult.responseB)}
                  className="hover:bg-accent/50"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground leading-relaxed" dir="rtl">
                  {battleResult.responseB}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Voting Section */}
      {battleResult && !hasVoted && (
        <Card className="battle-card arena-glow">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">أي النموذجين أفضل؟</h3>
              <p className="text-muted-foreground">صوت للنموذج الذي قدم إجابة أفضل</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                <Button
                  onClick={() => handleVote('A')}
                  variant="outline"
                  className="h-16 border-arena-blue text-arena-blue hover:bg-arena-blue/10 transition-all"
                >
                  <div className="text-center">
                    <ThumbsUp className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm">النموذج A</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handleVote('B')}
                  variant="outline"
                  className="h-16 border-arena-red text-arena-red hover:bg-arena-red/10 transition-all"
                >
                  <div className="text-center">
                    <ThumbsUp className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm">النموذج B</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handleVote('tie')}
                  variant="outline"
                  className="h-16 border-arena-green text-arena-green hover:bg-arena-green/10 transition-all"
                >
                  <div className="text-center">
                    <Equal className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm">متعادل</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handleVote('both_bad')}
                  variant="outline"
                  className="h-16 border-arena-neutral text-arena-neutral hover:bg-arena-neutral/10 transition-all"
                >
                  <div className="text-center">
                    <X className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm">كلاهما سيء</div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Post-Vote Message */}
      {hasVoted && (
        <Card className="battle-card bg-gradient-success">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">🎉 شكراً لك!</h3>
            <p className="text-white/90">
              تم تسجيل تصويتك وسيساهم في تحسين ترتيب النماذج
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}