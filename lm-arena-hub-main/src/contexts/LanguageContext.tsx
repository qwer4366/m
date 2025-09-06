import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
    ar: {
        // Header
        'header.title': 'Mu3 killer piaaz',
        'header.subtitle': 'ساحة النماذج المتقدمة',
        'header.battle': 'المعركة',
        'header.leaderboard': 'لوحة المتصدرين',
        'header.chat': 'المحادثة المباشرة',
        'header.stats': 'الإحصائيات',
    

        // Main page
        'main.title': 'Mu3 killer piaaz',
        'main.subtitle': 'منصة متقدمة لتقييم النماذج اللغوية مع دعم مجاني لأحدث تقنيات الذكاء الاصطناعي',
        'main.battles': 'المعارك',
        'main.chat': 'المحادثة',
        'main.images': 'الصور',

        // Battle interface
        'battle.title': '⚔️ ساحة المعركة',
        'battle.subtitle': 'اكتب سؤالك وشاهد كيف يجيب نموذجان مختلفان، ثم صوت للأفضل',
        'battle.placeholder': 'اكتب سؤالك أو مطالبتك هنا... (مثال: اشرح لي مفهوم الذكاء الاصطناعي)',
        'battle.start': 'ابدأ المعركة',
        'battle.processing': 'جاري المعالجة...',
        'battle.newBattle': 'معركة جديدة',

        // Chat interface
        'chat.title': '💬 محادثة مباشرة مع النماذج',
        'chat.subtitle': 'تحدث مباشرة مع أقوى النماذج اللغوية مجاناً',
        'chat.selectModel': 'اختر النموذج للمحادثة',
        'chat.placeholder': 'اكتب رسالتك...',
        'chat.send': 'إرسال',

        // Image generator
        'image.title': '🎨 مولد الصور بالذكاء الاصطناعي',
        'image.subtitle': 'اكتب وصفاً للصورة التي تريدها وسيقوم DALL-E 3 بإنشائها مجاناً',
        'image.placeholder': 'اكتب وصفاً مفصلاً للصورة...',
        'image.generate': 'إنشاء الصورة',
        'image.generating': 'جاري إنشاء الصورة...',

        // Common
        'common.error': 'خطأ',
        'common.success': 'نجح',
        'common.loading': 'جاري التحميل...',
        'common.copy': 'نسخ',
        'common.download': 'تحميل',
        'common.settings': 'الإعدادات',
    },
    en: {
        // Header
        'header.title': 'Mu3 killer piaaz',
        'header.subtitle': 'Advanced AI Arena',
        'header.battle': 'Battle',
        'header.leaderboard': 'Leaderboard',
        'header.chat': 'Direct Chat',
        'header.stats': 'Statistics',
    

        // Main page
        'main.title': 'Mu3 killer piaaz',
        'main.subtitle': 'Advanced platform for evaluating language models with free access to GPT-5, Claude & DALL-E via Puter.js',
        'main.battles': 'Battles',
        'main.chat': 'Chat',
        'main.images': 'Images',

        // Battle interface
        'battle.title': '⚔️ Battle Arena',
        'battle.subtitle': 'Write your question and see how two different models respond, then vote for the best',
        'battle.placeholder': 'Write your question or prompt here... (example: explain artificial intelligence to me)',
        'battle.start': 'Start Battle',
        'battle.processing': 'Processing...',
        'battle.newBattle': 'New Battle',

        // Chat interface
        'chat.title': '💬 Direct Chat with Models',
        'chat.subtitle': 'Chat directly with the most powerful language models for free via Puter.js',
        'chat.selectModel': 'Select model for chat',
        'chat.placeholder': 'Type your message...',
        'chat.send': 'Send',

        // Image generator
        'image.title': '🎨 AI Image Generator',
        'image.subtitle': 'Describe the image you want and DALL-E 3 will create it for free',
        'image.placeholder': 'Write a detailed description of the image...',
        'image.generate': 'Generate Image',
        'image.generating': 'Generating image...',

        // Common
        'common.error': 'Error',
        'common.success': 'Success',
        'common.loading': 'Loading...',
        'common.copy': 'Copy',
        'common.download': 'Download',
        'common.settings': 'Settings',
    }
} as const;

interface LanguageProviderProps {
    children: ReactNode;
}

function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>('ar');

    const t = (key: string): string => {
        const translation = translations[language];
        return (translation as any)[key] || key;
    };

    const contextValue: LanguageContextType = {
        language,
        setLanguage,
        t
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageProvider;