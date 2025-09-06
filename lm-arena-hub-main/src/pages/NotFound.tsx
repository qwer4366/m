import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <div className="text-8xl mb-4">🤖</div>
          <CardTitle className="text-4xl font-bold gradient-text mb-2">404</CardTitle>
          <p className="text-xl text-muted-foreground">
            الصفحة غير موجودة
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
            المسار المطلوب: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link to="/">
                <Home className="w-4 h-4 ml-2" />
                الصفحة الرئيسية
              </Link>
            </Button>
            
            <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للخلف
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              الصفحات المتاحة:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">الرئيسية</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/leaderboard">لوحة المتصدرين</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/stats">الإحصائيات</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
