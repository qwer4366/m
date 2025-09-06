import { useState } from "react";
import { Menu, X, Trophy, MessageSquare, BarChart3, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  {
    name: "الرئيسية",
    href: "/", 
    icon: Swords
  },
  {
    name: "لوحة المتصدرين",
    href: "/leaderboard",
    icon: Trophy
  },
  {
    name: "الإحصائيات",
    href: "/stats", 
    icon: BarChart3
  }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white/20">
              <img 
                src="/logo/photo_٢٠٢٥-٠٨-١٥_١٥-٥٥-٤٠ (2).jpg" 
                alt="Mu3 Logo" 
                className="w-full h-full object-cover object-center scale-110"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<span class="text-white font-bold text-lg">🤵</span>';
                }}
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold gradient-text">Mu3</h1>
              <p className="text-xs text-muted-foreground">ساحة النماذج المتقدمة</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-arena-glow" 
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Language & User Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex border-border">
              🇸🇦 العربية
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-card border-border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white/20">
                    <img 
                      src="/logo/photo_٢٠٢٥-٠٨-١٥_١٥-٥٥-٤٠ (2).jpg" 
                      alt="Mu3 Logo" 
                      className="w-full h-full object-cover object-center scale-110"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<span class="text-white font-bold text-lg">🤵</span>';
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Mu3</h1>
                    <p className="text-xs text-muted-foreground">ساحة النماذج المتقدمة</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link key={item.name} to={item.href}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start gap-3 text-right ${
                            isActive 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-accent/50"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                  <Button variant="outline" className="w-full border-border">
                    🇸🇦 العربية
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}