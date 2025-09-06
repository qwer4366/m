import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LeaderboardPage from "./pages/LeaderboardPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/stats" element={<div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">صفحة الإحصائيات</h1>
            <p className="text-muted-foreground">قريباً...</p>
          </div>
        </div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
