import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus, Crown, Star, Zap, BarChart3 } from "lucide-react";

interface ModelRanking {
  rank: number;
  name: string;
  provider: string;
  elo: number;
  battles: number;
  winRate: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  category: 'text' | 'multimodal' | 'reasoning';
  isNew?: boolean;
}

const mockRankings: ModelRanking[] = [
  {
    rank: 1,
    name: "GPT-5",
    provider: "OpenAI",
    elo: 1847,
    battles: 12543,
    winRate: 73.2,
    trend: 'up',
    trendValue: 15,
    category: 'text',
    isNew: true
  },
  {
    rank: 2,
    name: "Claude Opus 4",
    provider: "Anthropic",
    elo: 1832,
    battles: 11234,
    winRate: 71.8,
    trend: 'up',
    trendValue: 8,
    category: 'text',
    isNew: true
  },
  {
    rank: 3,
    name: "o3",
    provider: "OpenAI",
    elo: 1798,
    battles: 8765,
    winRate: 69.4,
    trend: 'up',
    trendValue: 22,
    category: 'reasoning',
    isNew: true
  },
  {
    rank: 4,
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    elo: 1776,
    battles: 10987,
    winRate: 67.9,
    trend: 'stable',
    trendValue: 0,
    category: 'text',
    isNew: true
  },
  {
    rank: 5,
    name: "GPT-4o",
    provider: "OpenAI",
    elo: 1743,
    battles: 15432,
    winRate: 65.3,
    trend: 'down',
    trendValue: -5,
    category: 'multimodal'
  },
  {
    rank: 6,
    name: "o1-pro",
    provider: "OpenAI",
    elo: 1721,
    battles: 7654,
    winRate: 63.7,
    trend: 'up',
    trendValue: 12,
    category: 'reasoning'
  },
  {
    rank: 7,
    name: "GPT-5 Nano",
    provider: "OpenAI",
    elo: 1698,
    battles: 9876,
    winRate: 61.2,
    trend: 'up',
    trendValue: 18,
    category: 'text',
    isNew: true
  },
  {
    rank: 8,
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    elo: 1675,
    battles: 13245,
    winRate: 59.8,
    trend: 'stable',
    trendValue: 2,
    category: 'text'
  }
];

export default function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'text' | 'multimodal' | 'reasoning'>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month');

  const filteredRankings = selectedCategory === 'all' 
    ? mockRankings 
    : mockRankings.filter(model => model.category === selectedCategory);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', value: number) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'text': return 'bg-blue-500/20 text-blue-400';
      case 'multimodal': return 'bg-purple-500/20 text-purple-400';
      case 'reasoning': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              <Trophy className="w-4 h-4 ml-2" />
              ترتيب النماذج اللغوية
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">لوحة المتصدرين</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ترتيب النماذج اللغوية حسب نظام Elo والأداء في المعارك المجتمعية
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)} className="flex-1">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">جميع النماذج</TabsTrigger>
              <TabsTrigger value="text">نصوص</TabsTrigger>
              <TabsTrigger value="multimodal">متعدد الوسائط</TabsTrigger>
              <TabsTrigger value="reasoning">تفكير</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">أسبوع</TabsTrigger>
              <TabsTrigger value="month">شهر</TabsTrigger>
              <TabsTrigger value="all">كل الوقت</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {filteredRankings.slice(0, 3).map((model, index) => (
            <Card key={model.name} className={`battle-card ${index === 0 ? 'arena-glow' : ''}`}>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  {getRankIcon(model.rank)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-xl font-bold">{model.name}</h3>
                    {model.isNew && (
                      <Badge variant="secondary" className="text-xs bg-success/20 text-success">
                        جديد
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{model.provider}</p>
                  <div className="text-3xl font-bold text-primary">{model.elo}</div>
                  <div className="text-sm text-muted-foreground">نقطة Elo</div>
                  <Badge className={getCategoryColor(model.category)}>
                    {model.category === 'text' ? 'نصوص' : 
                     model.category === 'multimodal' ? 'متعدد الوسائط' : 'تفكير'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Rankings Table */}
        <Card className="battle-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              الترتيب الكامل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRankings.map((model) => (
                <div key={model.name} className="flex items-center gap-4 p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(model.rank)}
                  </div>

                  {/* Model Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{model.name}</h3>
                      {model.isNew && (
                        <Badge variant="secondary" className="text-xs bg-success/20 text-success">
                          <Star className="w-3 h-3 ml-1" />
                          جديد
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">{model.provider}</p>
                  </div>

                  {/* Category */}
                  <Badge className={getCategoryColor(model.category)}>
                    {model.category === 'text' ? 'نصوص' : 
                     model.category === 'multimodal' ? 'متعدد الوسائط' : 'تفكير'}
                  </Badge>

                  {/* Stats */}
                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-primary">{model.elo}</div>
                    <div className="text-xs text-muted-foreground">Elo</div>
                  </div>

                  <div className="text-center min-w-[80px]">
                    <div className="text-lg font-semibold">{model.winRate}%</div>
                    <div className="text-xs text-muted-foreground">معدل الفوز</div>
                  </div>

                  <div className="text-center min-w-[80px]">
                    <div className="text-lg font-semibold">{model.battles.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">معارك</div>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center gap-1 min-w-[60px]">
                    {getTrendIcon(model.trend, model.trendValue)}
                    <span className={`text-sm font-medium ${
                      model.trend === 'up' ? 'text-green-500' : 
                      model.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {model.trend === 'stable' ? '0' : 
                       model.trend === 'up' ? `+${model.trendValue}` : model.trendValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <Card className="battle-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredRankings.reduce((sum, model) => sum + model.battles, 0).toLocaleString()}
              </div>
              <div className="text-muted-foreground">إجمالي المعارك</div>
            </CardContent>
          </Card>

          <Card className="battle-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredRankings.length}
              </div>
              <div className="text-muted-foreground">النماذج النشطة</div>
            </CardContent>
          </Card>

          <Card className="battle-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round(filteredRankings.reduce((sum, model) => sum + model.winRate, 0) / filteredRankings.length)}%
              </div>
              <div className="text-muted-foreground">متوسط معدل الفوز</div>
            </CardContent>
          </Card>

          <Card className="battle-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredRankings.filter(model => model.isNew).length}
              </div>
              <div className="text-muted-foreground">نماذج جديدة</div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}