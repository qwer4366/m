import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Mail, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white/20">
                <img
                  src="/logo/photo_٢٠٢٥-٠٨-١٥_١٥-٥٥-٤٠ (2).jpg"
                  alt="Mu3 Logo"
                  className="w-full h-full object-cover object-center scale-110"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span class="text-white font-bold text-lg">⚔️</span>';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">Mu3 killer piaaz</h3>
                <p className="text-xs text-muted-foreground">ساحة النماذج المتقدمة</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              منصة مفتوحة المصدر لتقييم النماذج اللغوية مع وصول مجاني لأحدث تقنيات الذكاء الاصطناعي
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-success/20 text-success">
                ✨ مجاني 100%
              </Badge>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                🔓 مفتوح المصدر
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">روابط سريعة</h4>
            <div className="space-y-2">
              <a href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                الرئيسية
              </a>
              <a href="/leaderboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                لوحة المتصدرين
              </a>
              <a href="/stats" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                الإحصائيات
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                الوثائق
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">المميزات</h4>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">⚔️ معارك النماذج</div>
              <div className="text-sm text-muted-foreground">💬 محادثة مباشرة</div>
              <div className="text-sm text-muted-foreground">🎨 توليد الصور</div>
              <div className="text-sm text-muted-foreground">📊 تحليلات متقدمة</div>
              <div className="text-sm text-muted-foreground">🌐 دعم متعدد اللغات</div>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">تواصل معنا</h4>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3 mr-auto" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
                <ExternalLink className="w-3 h-3 mr-auto" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Mail className="w-4 h-4" />
                البريد الإلكتروني
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>صُنع بـ</span>
              <Heart className="w-4 h-4 text-red-500" />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2025 Mu3 killer piaaz</span>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">شروط الاستخدام</a>
            </div>
          </div>
        </div>

        {/* Powered by */}
        <Card className="mt-6 bg-gradient-subtle border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-muted-foreground">مبني بـ</span>
              <Badge variant="outline" className="border-primary/30 text-primary">
                ⚡ Vite
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary">
                ⚛️ React
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary">
                🎨 Tailwind CSS
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
}