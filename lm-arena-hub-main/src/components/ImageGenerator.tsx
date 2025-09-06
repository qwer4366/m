import { useState } from "react";
import { Send, Download, Copy, Sparkles, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { puterAI } from "@/services/puterAI";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<HTMLImageElement | null>(null);
  const [imageHistory, setImageHistory] = useState<Array<{prompt: string, image: HTMLImageElement}>>([]);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة وصف للصورة",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const imageElement = await puterAI.generateImage(prompt, {
        model: "dall-e-3",
        size: "1024x1024",
        quality: "standard"
      });

      setGeneratedImage(imageElement);
      setImageHistory(prev => [{prompt, image: imageElement}, ...prev.slice(0, 4)]);
      
      toast({
        title: "تم إنشاء الصورة بنجاح! 🎨",
        description: "تم توليد الصورة باستخدام DALL-E 3",
      });

    } catch (error) {
      console.error('Image generation error:', error);
      
      // Create a placeholder image for demo
      const img = document.createElement('img');
      img.src = `data:image/svg+xml;base64,${btoa(`
        <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#1a1a2e"/>
          <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" text-anchor="middle" dy=".3em">
            🎨 صورة تجريبية
          </text>
          <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#cccccc" text-anchor="middle" dy=".3em">
            ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}
          </text>
          <text x="50%" y="80%" font-family="Arial, sans-serif" font-size="12" fill="#888888" text-anchor="middle" dy=".3em">
            للحصول على صور حقيقية، تأكد من تحميل Puter.js
          </text>
        </svg>
      `)}`;
      img.alt = `Generated image: ${prompt}`;
      
      setGeneratedImage(img);
      setImageHistory(prev => [{prompt, image: img}, ...prev.slice(0, 4)]);
      
      toast({
        title: "وضع تجريبي",
        description: "يتم عرض صورة تجريبية. للحصول على صور حقيقية، تأكد من تحميل Puter.js.",
        variant: "default"
      });
    }

    setIsGenerating(false);
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage.src;
    link.download = `mu3-killer-piaaz-${Date.now()}.png`;
    link.click();
    
    toast({
      title: "تم التحميل",
      description: "تم تحميل الصورة بنجاح",
    });
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    toast({
      title: "تم النسخ",
      description: "تم نسخ وصف الصورة إلى الحافظة",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateImage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="battle-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold gradient-text mb-2">🎨 مولد الصور بالذكاء الاصطناعي</h2>
              <p className="text-muted-foreground">
                اكتب وصفاً للصورة التي تريدها وسيتم إنشاؤها بالذكاء الاصطناعي
              </p>
            </div>
            
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب وصفاً مفصلاً للصورة... (مثال: قطة جميلة تجلس في حديقة مليئة بالورود الملونة، أسلوب فني رقمي)"
                className="min-h-[100px] bg-background border-border resize-none text-lg"
                maxLength={1000}
                dir="rtl"
              />
              <div className="absolute bottom-3 left-3 text-xs text-muted-foreground">
                {prompt.length}/1000
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleGenerateImage}
                disabled={isGenerating || !prompt.trim()}
                className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                size="lg"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                      <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                      <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
                    </div>
                    جاري إنشاء الصورة...
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 ml-2" />
                    إنشاء الصورة
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="bg-success/20 text-success">
                <ImageIcon className="w-3 h-3 ml-1" />
                DALL-E 3
              </Badge>
              <span>•</span>
              <span>دقة عالية 1024x1024</span>
              <span>•</span>
              <span>مجاني تماماً</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Image */}
      {generatedImage && (
        <Card className="battle-card arena-glow">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">الصورة المولدة</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyPrompt(prompt)}
                    className="border-border hover:bg-accent/50"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadImage}
                    className="border-border hover:bg-accent/50"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative max-w-lg">
                  <img
                    src={generatedImage.src}
                    alt={generatedImage.alt}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              <div className="p-4 bg-accent/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">الوصف المستخدم:</p>
                <p className="text-foreground" dir="rtl">{prompt}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image History */}
      {imageHistory.length > 0 && (
        <Card className="battle-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">الصور السابقة</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imageHistory.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative group cursor-pointer" onClick={() => setGeneratedImage(item.image)}>
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">اضغط للعرض</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2" dir="rtl">
                    {item.prompt}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="battle-card bg-gradient-subtle">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">💡 نصائح للحصول على أفضل النتائج</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>كن مفصلاً في الوصف (الألوان، الأسلوب، الإضاءة)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>اذكر الأسلوب الفني المطلوب (واقعي، كرتوني، رقمي)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>حدد زاوية التصوير والتركيب</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>استخدم كلمات وصفية قوية ومحددة</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>اذكر الحالة المزاجية أو الجو العام</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>تجنب الوصف المتناقض أو المعقد جداً</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}