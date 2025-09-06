import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { puterAI } from "@/services/puterAI";
import { toast } from "@/hooks/use-toast";
import { Eye, Bot, Image as ImageIcon, Loader2 } from "lucide-react";

export function VisionAnalyzer() {
  const [prompt, setPrompt] = useState("ماذا ترى في هذه الصورة؟");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!imageUrl.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رابط الصورة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await puterAI.analyzeImage(prompt, imageUrl);
      const resultText = result?.text || "لم يتمكن النموذج من تحليل الصورة.";
      setAnalysisResult(resultText);
      toast({
        title: "تم تحليل الصورة بنجاح!",
        description: "تم عرض النتيجة أدناه.",
      });
    } catch (error) {
      console.error("Image analysis error:", error);
      const errorMessage = (error as Error).message || "حدث خطأ غير متوقع.";
      setAnalysisResult(`حدث خطأ أثناء تحليل الصورة: ${errorMessage}`);
      toast({
        title: "خطأ في التحليل",
        description: "يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="battle-card">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold gradient-text">👁️ تحليل الصور بالذكاء الاصطناعي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="image-url" className="flex items-center gap-2 text-sm font-medium">
              <ImageIcon className="w-4 h-4" />
              رابط الصورة
            </label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              اكتب سؤالك عن الصورة
            </label>
            <Textarea
              id="prompt"
              placeholder="مثال: صف هذه الصورة بالتفصيل."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <Button onClick={handleAnalyze} disabled={isLoading || !imageUrl.trim()} className="w-full bg-gradient-primary">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Eye className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "جاري التحليل..." : "تحليل الصورة"}
          </Button>
        </CardContent>
      </Card>

      {imageUrl && (
        <Card className="battle-card">
          <CardHeader>
            <CardTitle className="text-lg">معاينة الصورة</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={imageUrl} alt="معاينة" className="rounded-lg max-w-full mx-auto max-h-96" />
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <Card className="battle-card arena-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="w-5 h-5" />
              نتيجة التحليل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{analysisResult}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
