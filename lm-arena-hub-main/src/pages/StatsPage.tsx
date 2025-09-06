import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsSection } from "@/components/StatsSection";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";

const StatsPage = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              <BarChart3 className="w-4 h-4 ml-2" />
              إحصائيات المنصة
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">الإحصائيات والتحليلات</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نظرة شاملة على أداء المنصة واستخدام النماذج اللغوية
            </p>
          </div>
        </div>

        <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="day">اليوم</TabsTrigger>
            <TabsTrigger value="week">الأسبوع</TabsTrigger>
            <TabsTrigger value="month">الشهر</TabsTrigger>
          </TabsList>
        </Tabs>

        <StatsSection />
      </main>

      <Footer />
    </div>
  );
};

export default StatsPage;