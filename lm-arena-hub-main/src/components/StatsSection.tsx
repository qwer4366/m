import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Zap, Globe, Clock, Award } from "lucide-react";

const statsData = [
  {
    title: "إحصائيات المعارك",
    icon: BarChart3,
    stats: [
      { label: "إجمالي المعارك", value: "127,543", change: "+2,341 اليوم" },
      { label: "معارك نشطة", value: "1,234", change: "في الوقت الحالي" },
      { label: "متوسط وقت الاستجابة", value: "1.8 ثانية", change: "-0.2s هذا الأسبوع" }
    ]
  },
  {
    title: "المستخدمون",
    icon: Users,
    stats: [
      { label: "مستخدمون نشطون", value: "45,678", change: "+1,234 هذا الشهر" },
      { label: "تصويتات اليوم", value: "8,921", change: "+15% من أمس" },
      { label: "مستخدمون جدد", value: "567", change: "هذا الأسبوع" }
    ]
  },
  {
    title: "الأداء",
    icon: Zap,
    stats: [
      { label: "وقت التشغيل", value: "99.9%", change: "آخر 30 يوم" },
      { label: "طلبات في الثانية", value: "2,341", change: "ذروة الاستخدام" },
      { label: "دقة النتائج", value: "94.7%", change: "معدل الرضا" }
    ]
  }
];

const topCategories = [
  { name: "البرمجة", battles: 23456, percentage: 28.5, icon: "💻" },
  { name: "الكتابة الإبداعية", battles: 18234, percentage: 22.1, icon: "✍️" },
  { name: "التحليل", battles: 15678, percentage: 19.0, icon: "📊" },
  { name: "الترجمة", battles: 12345, percentage: 15.0, icon: "🌐" },
  { name: "الرياضيات", battles: 8765, percentage: 10.6, icon: "🔢" },
  { name: "أخرى", battles: 4321, percentage: 4.8, icon: "📝" }
];

export function StatsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">📊 إحصائيات المنصة</h2>
        <p className="text-muted-foreground">
          نظرة شاملة على أداء المنصة والمستخدمين
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {statsData.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index} className="battle-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="font-bold text-lg">{stat.value}</span>
                    </div>
                    <div className="text-xs text-success">{stat.change}</div>
                    {statIndex < section.stats.length - 1 && (
                      <div className="border-b border-border/30 pt-2"></div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Categories Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="battle-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              أكثر الفئات استخداماً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-2xl">{category.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {category.battles.toLocaleString()} معركة
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {category.percentage}% من إجمالي المعارك
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="battle-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              إحصائيات عالمية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-accent/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">45+</div>
                <div className="text-sm text-muted-foreground">نموذج لغوي</div>
              </div>
              <div className="p-4 bg-accent/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">127K+</div>
                <div className="text-sm text-muted-foreground">معركة مكتملة</div>
              </div>
              <div className="p-4 bg-accent/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">89</div>
                <div className="text-sm text-muted-foreground">دولة</div>
              </div>
              <div className="p-4 bg-accent/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">متاح دائماً</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">🇸🇦 السعودية</span>
                <Badge variant="secondary">32.5%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🇺🇸 الولايات المتحدة</span>
                <Badge variant="secondary">18.2%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🇦🇪 الإمارات</span>
                <Badge variant="secondary">12.8%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🇪🇬 مصر</span>
                <Badge variant="secondary">9.4%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🌍 أخرى</span>
                <Badge variant="secondary">27.1%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card className="battle-card bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            النشاط في الوقت الفعلي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-success">1,234</div>
              <div className="text-sm text-muted-foreground">معارك نشطة</div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full loading-dots"></div>
                <div className="w-2 h-2 bg-success rounded-full loading-dots"></div>
                <div className="w-2 h-2 bg-success rounded-full loading-dots"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">567</div>
              <div className="text-sm text-muted-foreground">مستخدمون متصلون</div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                +23 في الدقيقة الأخيرة
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-warning">89</div>
              <div className="text-sm text-muted-foreground">محادثات نشطة</div>
              <Badge variant="secondary" className="bg-warning/20 text-warning">
                متوسط 2.3 دقيقة
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-arena-red">45</div>
              <div className="text-sm text-muted-foreground">صور يتم إنشاؤها</div>
              <Badge variant="secondary" className="bg-arena-red/20 text-arena-red">
                DALL-E 3 نشط
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}