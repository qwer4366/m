import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Sparkles, Shield, Zap, Globe } from "lucide-react";

const faqData = [
  {
    question: "ما هو Mu3 killer piaaz؟",
    answer: "Mu3 killer piaaz هي منصة مفتوحة المصدر لتقييم النماذج اللغوية الذكية. نوفر وصولاً مجانياً لأحدث النماذج مثل GPT-5 و Claude و DALL-E عبر تقنية Puter.js، مما يتيح للمستخدمين مقارنة أداء النماذج المختلفة في بيئة عادلة وشفافة.",
    icon: Sparkles,
    tags: ["عام", "تعريف"]
  },
  {
    question: "كيف يعمل نظام المعارك؟",
    answer: "نظام المعارك يعرض إجابات من نموذجين مختلفين لنفس السؤال دون الكشف عن هوية النماذج. بعد قراءة الإجابتين، يمكنك التصويت للأفضل. هذا النهج المجهول يضمن تقييماً عادلاً وموضوعياً لأداء النماذج.",
    icon: Shield,
    tags: ["معارك", "تقييم"]
  },
  {
    question: "ما هو نظام Elo المستخدم في الترتيب؟",
    answer: "نظام Elo هو نظام تصنيف رياضي يُستخدم في الشطرنج والألعاب التنافسية. كل نموذج يبدأ بنقاط معينة، وعند الفوز في معركة يكسب نقاط من النموذج المهزوم. هذا يضمن ترتيباً ديناميكياً يعكس الأداء الحقيقي للنماذج.",
    icon: HelpCircle,
    tags: ["ترتيب", "Elo"]
  },
  {
    question: "هل الخدمة مجانية حقاً؟",
    answer: "نعم! نوفر وصولاً مجانياً كاملاً لجميع النماذج المتاحة. لا توجد رسوم خفية أو حدود استخدام صارمة. هدفنا هو جعل أحدث تقنيات الذكاء الاصطناعي متاحة للجميع.",
    icon: Zap,
    tags: ["مجاني", "وصول"]
  },
  {
    question: "ما هي النماذج المتاحة؟",
    answer: "نوفر أحدث النماذج من OpenAI (GPT-5, GPT-4o, o1, o3) و Anthropic (Claude Sonnet 4, Claude Opus 4) بالإضافة إلى DALL-E 3 لتوليد الصور. نضيف نماذج جديدة باستمرار.",
    icon: Globe,
    tags: ["نماذج", "متاح"]
  },
  {
    question: "كيف أضمن دقة النتائج؟",
    answer: "نستخدم عدة آليات لضمان الدقة: المعارك المجهولة، نظام Elo الرياضي، عينات كبيرة من التصويتات، ومراجعة دورية للنتائج. كما نوفر شفافية كاملة في المنهجية المستخدمة.",
    icon: Shield,
    tags: ["دقة", "جودة"]
  }
];

export function FAQSection() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">❓ الأسئلة الشائعة</h2>
        <p className="text-muted-foreground">
          إجابات على أكثر الأسئلة شيوعاً حول المنصة
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {faqData.map((faq, index) => {
          const Icon = faq.icon;
          return (
            <Card key={index} className="battle-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <div className="flex gap-2 mb-3">
                        {faq.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed" dir="rtl">
                    {faq.answer}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Contact Section */}
      <Card className="battle-card bg-gradient-subtle">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold">لديك سؤال آخر؟</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              إذا لم تجد إجابة لسؤالك هنا، لا تتردد في التواصل معنا. فريقنا جاهز لمساعدتك على مدار الساعة.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="outline" className="px-4 py-2">
                📧 support@mu3-killer-piaaz.com
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                💬 دردشة مباشرة متاحة
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                📱 دعم فني 24/7
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}