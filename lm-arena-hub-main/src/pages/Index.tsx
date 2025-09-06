import { useState } from "react";
import { Header } from "@/components/Header";
import { BattleInterface } from "@/components/BattleInterface";
import { ChatInterface } from "@/components/ChatInterface";
import { ImageGenerator } from "@/components/ImageGenerator";
import { ModelSelector, type Model } from "@/components/ModelSelector";
import { Leaderboard } from "@/components/Leaderboard";
import { StatsSection } from "@/components/StatsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { Sparkles, Users, BarChart3, TrendingUp, ArrowRight, Zap, Shield, Globe, MessageCircle, Swords, Image } from "lucide-react";

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [activeTab, setActiveTab] = useState("battle");

  const stats = [
    {
      icon: Users,
      label: "معارك اليوم",
      value: "1,234",
      trend: "+12%"
    },
    {
      icon: BarChart3,
      label: "النماذج النشطة", 
      value: "8",
      trend: "+2"
    },
    {
      icon: TrendingUp,
      label: "المستخدمون النشطون",
      value: "567",
      trend: "+8%"
    },
    {
      icon: Sparkles,
      label: "تقييمات اليوم",
      value: "2,891",
      trend: "+15%"
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-4 h-4 ml-2" />
              منصة مفتوحة المصدر لتقييم النماذج اللغوية
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">Mu3 killer piaaz</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              منصة متقدمة لتقييم النماذج اللغوية مع دعم مجاني لأحدث تقنيات الذكاء الاصطناعي
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="battle-card">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mx-auto mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                      <div className="text-xs text-success">{stat.trend}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Model Selection Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="battle-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">🤖 اختر نموذجاً للمحادثة</h2>
                  <p className="text-muted-foreground">
                    أو ابدأ معركة مباشرة بين نموذجين عشوائيين
                  </p>
                </div>
                
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelSelect={setSelectedModel}
                  placeholder="اختر النموذج للمحادثة المباشرة"
                  className="h-16"
                />
                
                {selectedModel && (
                  <div className="p-4 bg-accent/20 rounded-lg border border-accent/30">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                        {selectedModel.icon}
                      </div>
                      <div className="flex-1 text-right">
                        <div className="font-medium">{selectedModel.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedModel.provider}</div>
                        <div className="flex gap-1 mt-1 justify-end">
                          {selectedModel.capabilities.map((cap) => (
                            <Badge key={cap} variant="secondary" className="text-xs">
                              {cap}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="battle" className="flex items-center gap-2">
              <Swords className="w-4 h-4" />
              المعارك
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              المحادثة
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              الصور
            </TabsTrigger>
          </TabsList>

          <TabsContent value="battle" className="mt-8">
            <BattleInterface 
              onBattleComplete={(result) => {
                console.log("Battle completed:", result);
              }}
            />
          </TabsContent>

          <TabsContent value="chat" className="mt-8">
            <ChatInterface selectedModel={selectedModel} />
          </TabsContent>

          <TabsContent value="image" className="mt-8">
            <ImageGenerator />
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 py-12">
          <Card className="battle-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-arena-blue/10 text-arena-blue mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">معارك عادلة</h3>
              <p className="text-muted-foreground">
                مقارنات مجهولة بين النماذج لضمان التقييم العادل والموضوعي
              </p>
            </CardContent>
          </Card>

          <Card className="battle-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-arena-green/10 text-arena-green mx-auto mb-4">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">ترتيب Elo</h3>
              <p className="text-muted-foreground">
                نظام ترتيب ديناميكي يعكس الأداء الحقيقي للنماذج في الوقت الفعلي
              </p>
            </CardContent>
          </Card>

          <Card className="battle-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-arena-red/10 text-arena-red mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">مجتمع نشط</h3>
              <p className="text-muted-foreground">
                آلاف المستخدمين يساهمون في تقييم النماذج وتحسين دقة النتائج
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Section */}
        <Leaderboard />

        {/* Stats Section */}
        <StatsSection />

        {/* Why Choose Us Section */}
        <div className="py-16">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold gradient-text">لماذا Mu3 killer piaaz؟</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              المنصة الوحيدة التي توفر وصولاً مجانياً لأحدث النماذج اللغوية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">سرعة وكفاءة</h3>
                  <p className="text-muted-foreground">
                    متوسط وقت استجابة أقل من ثانيتين مع دعم المعالجة المتوازية لآلاف المعارك يومياً
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 text-success shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">دعم متعدد اللغات</h3>
                  <p className="text-muted-foreground">
                    دعم كامل للغة العربية والإنجليزية مع خطط لإضافة المزيد من اللغات
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-warning/10 text-warning shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">تحليلات متقدمة</h3>
                  <p className="text-muted-foreground">
                    رؤى عميقة حول أداء النماذج مع إحصائيات مفصلة وتقارير تفاعلية
                  </p>
                </div>
              </div>

              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                ابدأ التقييم الآن
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </div>

            <Card className="battle-card bg-gradient-subtle">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">94.7%</div>
                    <div className="text-muted-foreground">دقة التقييم</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">45+</div>
                      <div className="text-sm text-muted-foreground">نموذج لغوي</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">127K+</div>
                      <div className="text-sm text-muted-foreground">معركة مكتملة</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      ✨ موثوق من الخبراء عالمياً
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toaster for notifications */}
      <Toaster />
    </div>
  );
};

export default Index;