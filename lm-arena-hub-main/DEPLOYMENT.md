# 🚀 دليل النشر - Mu3 killer piaaz

دليل شامل لنشر منصة Mu3 killer piaaz على منصات مختلفة.

## 📋 المتطلبات الأساسية

- Node.js 18+
- npm أو yarn
- Git

## 🌐 النشر على Vercel

### الطريقة السريعة
1. ادفع الكود إلى GitHub
2. اربط المستودع بـ Vercel
3. سيتم النشر تلقائياً

### الطريقة اليدوية
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel --prod
```

### إعدادات Vercel
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## 🔥 النشر على Netlify

### من GitHub
1. اربط المستودع بـ Netlify
2. إعدادات البناء:
   - Build command: `npm run build`
   - Publish directory: `dist`

### من CLI
```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# النشر
netlify deploy --prod --dir=dist
```

## ☁️ النشر على AWS S3 + CloudFront

### 1. بناء المشروع
```bash
npm run build
```

### 2. إنشاء S3 Bucket
```bash
aws s3 mb s3://mu3-killer-piaaz-app
aws s3 sync dist/ s3://mu3-killer-piaaz-app --delete
```

### 3. إعداد CloudFront
- إنشاء توزيع CloudFront
- ربطه بـ S3 bucket
- تفعيل HTTPS

## 🐳 النشر باستخدام Docker

### Dockerfile
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  mu3-killer-piaaz:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
```

### تشغيل Docker
```bash
# بناء الصورة
docker build -t mu3-killer-piaaz .

# تشغيل الحاوية
docker run -p 80:80 mu3-killer-piaaz
```

## 🔧 متغيرات البيئة

### للإنتاج
```env
VITE_APP_ENV=production
VITE_API_URL=https://api.mu3killerpiaaz.com
VITE_PUTER_API_KEY=your_production_key
VITE_ANALYTICS_ID=your_analytics_id
```

### للتطوير
```env
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
```

## 📊 مراقبة الأداء

### Google Analytics
```html
<!-- في index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry للأخطاء
```bash
npm install @sentry/react @sentry/tracing
```

## 🔒 الأمان

### Headers الأمان
```nginx
# في nginx.conf
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### HTTPS
- استخدم شهادات SSL مجانية من Let's Encrypt
- فعل HSTS
- استخدم HTTP/2

## 🚀 تحسين الأداء

### تحسين البناء
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### ضغط الملفات
```bash
# تفعيل gzip في nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

## 📱 PWA (Progressive Web App)

### إضافة Service Worker
```bash
npm install vite-plugin-pwa
```

### تكوين PWA
```javascript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Mu3 killer piaaz',
        short_name: 'Mu3KP',
        description: 'منصة تقييم النماذج اللغوية',
        theme_color: '#8b5cf6',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 📈 مراقبة الأداء

### Core Web Vitals
- استخدم Lighthouse للتحليل
- راقب FCP, LCP, CLS
- حسن تحميل الصور والخطوط

### أدوات المراقبة
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Vercel Analytics

## 🆘 استكشاف الأخطاء

### مشاكل شائعة
1. **خطأ 404 في التوجيه**: تأكد من إعداد fallback للـ SPA
2. **مشاكل CORS**: تحقق من إعدادات الخادم
3. **بطء التحميل**: حسن حجم الحزم وضغط الملفات

### سجلات الأخطاء
```javascript
// إضافة تتبع الأخطاء
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // إرسال للخدمة المراقبة
});
```

---

## 📞 الدعم

إذا واجهت مشاكل في النشر:
- راجع الوثائق
- تحقق من سجلات الأخطاء
- تواصل مع فريق الدعم

**نصيحة**: ابدأ بالنشر على Vercel أو Netlify للبساطة، ثم انتقل لحلول أكثر تعقيداً حسب الحاجة.