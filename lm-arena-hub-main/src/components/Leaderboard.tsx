import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    name: "GPT-5",
    provider: "OpenAI",
    elo: 1847,
    change: +23,
    battles: 1234,
    winRate: 68.5,
    icon: "🚀"
  },
  {
    rank: 2,
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    elo: 1823,
    change: +15,
    battles: 1156,
    winRate: 66.2,
    icon: "🎭"
  },
  {
    rank: 3,
    name: "o3",
    provider: "OpenAI",
    elo: 1798,
    change: +8,
    battles: 987,
    winRate: 64.1,
    icon: "🧠"
  },
  {
    rank: 4,
    name: "GPT-4o",
    provider: "OpenAI",
    elo: 1776,
    change: -5,
    battles: 2341,
    winRate: 62.8,
    icon: "🎯"
  },
  {
    rank: 5,
    name: "Claude Opus 4",
    provider: "Anthropic",
    elo: 1754,
    change: +12,
    battles: 876,
    winRate: 61.4,
    icon: "🎨"
  }
];

export function Leaderboard() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">🏆 لوحة المتصدرين</h2>
        <p className="text-muted-foreground">
          ترتيب النماذج حسب نظام Elo المحدث في الوقت الفعلي
        </p>
      </div>

      <Card className="battle-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            أفضل النماذج اللغوية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((model, index) => (
              <div
                key={model.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:bg-accent/20 ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400/10 to-transparent border-gray-400/30' :
                  index === 2 ? 'bg-gradient-to-r from-amber-600/10 to-transparent border-amber-600/30' :
                  'border-border'
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                  {model.rank}
                </div>

                {/* Model Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-2xl">{model.icon}</div>
                  <div>
                    <div className="font-semibold text-lg">{model.name}</div>
                    <div className="text-sm text-muted-foreground">{model.provider}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{model.elo}</div>
                    <div className="text-muted-foreground">Elo</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{model.winRate}%</div>
                    <div className="text-muted-foreground">نسبة الفوز</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{model.battles.toLocaleString()}</div>
                    <div className="text-muted-foreground">معارك</div>
                  </div>
                </div>

                {/* Change */}
                <div className="flex items-center gap-1">
                  {model.change > 0 ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 font-medium">+{model.change}</span>
                    </>
                  ) : model.change < 0 ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 font-medium">{model.change}</span>
                    </>
                  ) : (
                    <>
                      <Minus className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground font-medium">0</span>
                    </>
                  )}
                </div>

                {/* Badge for top 3 */}
                {index < 3 && (
                  <Badge 
                    variant="secondary" 
                    className={
                      index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                      index === 1 ? 'bg-gray-400/20 text-gray-400' :
                      'bg-amber-600/20 text-amber-600'
                    }
                  >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}