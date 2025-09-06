# Mu3 killer piaaz - ساحة النماذج اللغوية المتقدمة

منصة مفتوحة المصدر متقدمة لتقييم ومقارنة النماذج اللغوية الكبيرة مع دعم مجاني لأحدث النماذج عبر Puter.js

## ✨ المميزات الرئيسية

### 🤖 دعم شامل للنماذج اللغوية
- **OpenAI Models**: GPT-5, GPT-5 Nano, GPT-5 Mini, GPT-4o, o1, o3, o4 وغيرها
- **Claude Models**: Claude Sonnet 4, Claude Opus 4, Claude 3.7
- **DALL-E 3**: توليد الصور بالذكاء الاصطناعي
- **وصول مجاني**: بدون مفاتيح API أو قيود استخدام

### ⚔️ معارك النماذج
- مقارنات مجهولة بين النماذج
- تصويت مجتمعي عادل
- نظام ترتيب Elo ديناميكي
- إحصائيات مفصلة للأداء

### 💬 محادثة مباشرة
- تفاعل مباشر مع أي نموذج
- دعم التدفق المباشر للاستجابات
- إعدادات متقدمة (Temperature, Max Tokens)
- واجهة محادثة سهلة الاستخدام

### 🎨 توليد الصور
- إنشاء صور بالذكاء الاصطناعي عبر DALL-E 3
- واجهة بسيطة وسهلة
- تحميل الصور المولدة
- نصائح لتحسين جودة الصور

## 🚀 التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: Puter.js (Free OpenAI & Claude API)
- **State Management**: React Hooks
- **Routing**: React Router DOM

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js 18+ 
- npm أو yarn

### خطوات التثبيت

```bash
# 1. استنساخ المشروع
git clone <repository-url>
cd mu3-killer-piaaz

# 2. تثبيت التبعيات
npm install

# 3. تشغيل الخادم المحلي
npm run dev

# 4. فتح المتصفح على
# http://localhost:5173
```

### البناء للإنتاج

```bash
# بناء المشروع
npm run build

# معاينة البناء
npm run preview
```

## 🔧 الإعداد والتكوين

### Puter.js Integration
المشروع يستخدم Puter.js للوصول المجاني لنماذج OpenAI و Claude. لا حاجة لمفاتيح API!

```html
<!-- تم تضمين Puter.js في index.html -->
<script src="https://js.puter.com/v2/"></script>
```

### إضافة نماذج جديدة
يمكنك إضافة نماذج جديدة في `src/services/puterAI.ts`:

```typescript
export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: "new-model-id",
    name: "New Model Name",
    provider: "Provider",
    type: "text",
    capabilities: ["نص", "تحليل"],
    icon: "🤖",
    isNew: true
  },
  // ... باقي النماذج
];
```

## 📁 هيكل المشروع

```
src/
├── components/          # مكونات React
│   ├── ui/             # مكونات UI الأساسية
│   ├── BattleInterface.tsx
│   ├── ChatInterface.tsx
│   ├── ImageGenerator.tsx
│   └── ModelSelector.tsx
├── services/           # خدمات التطبيق
│   └── puterAI.ts     # خدمة Puter.js
├── pages/             # صفحات التطبيق
│   └── Index.tsx
├── hooks/             # React Hooks مخصصة
├── lib/               # مكتبات مساعدة
└── styles/            # ملفات التنسيق
```

## 🎯 الاستخدام

### 1. معارك النماذج
- اكتب سؤالك في صندوق النص
- اضغط "ابدأ المعركة"
- قارن بين الإجابتين
- صوت للأفضل

### 2. المحادثة المباشرة
- اختر النموذج المطلوب
- ابدأ المحادثة
- استخدم الإعدادات المتقدمة حسب الحاجة

### 3. توليد الصور
- اكتب وصفاً مفصلاً للصورة
- اضغط "إنشاء الصورة"
- حمل الصورة أو شاركها

## 🌟 المميزات المتقدمة

### دعم اللغة العربية
- واجهة مستخدم باللغة العربية
- دعم النصوص من اليمين لليسار (RTL)
- تحسين للمحتوى العربي

### تجربة مستخدم محسنة
- تصميم متجاوب لجميع الأجهزة
- رسوم متحركة سلسة
- إشعارات تفاعلية
- وضع مظلم/فاتح

### الأداء والسرعة
- تحميل سريع مع Vite
- تحسين الصور والموارد
- تخزين مؤقت ذكي
- دعم التدفق المباشر

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 شكر وتقدير

- [Puter.js](https://puter.com) - للوصول المجاني لنماذج الذكاء الاصطناعي
- [shadcn/ui](https://ui.shadcn.com) - لمكونات UI الجميلة
- [Tailwind CSS](https://tailwindcss.com) - لنظام التنسيق المرن

## 📞 التواصل

- **المطور**: Mu3 killer piaaz Team
- **البريد الإلكتروني**: [email]
- **الموقع**: [website]

---

**Mu3 killer piaaz** - حيث تلتقي أحدث تقنيات الذكاء الاصطناعي مع سهولة الاستخدام 🚀
