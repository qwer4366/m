// System Check Utilities
// Check browser compatibility and system requirements

export interface SystemCheckResult {
  isSupported: boolean;
  issues: string[];
  warnings: string[];
  recommendations: string[];
}

export interface BrowserInfo {
  name: string;
  version: string;
  isSupported: boolean;
}

// Check if Puter.js is loaded and available
export function checkPuterJS(): boolean {
  return typeof window !== 'undefined' && 
         typeof window.puter !== 'undefined' && 
         typeof window.puter.ai !== 'undefined';
}

// Get browser information
export function getBrowserInfo(): BrowserInfo {
  const userAgent = navigator.userAgent;
  let name = 'Unknown';
  let version = 'Unknown';
  let isSupported = true;

  // Chrome
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    name = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    version = match ? match[1] : 'Unknown';
    isSupported = parseInt(version) >= 90;
  }
  // Firefox
  else if (userAgent.includes('Firefox')) {
    name = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    version = match ? match[1] : 'Unknown';
    isSupported = parseInt(version) >= 88;
  }
  // Safari
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    name = 'Safari';
    const match = userAgent.match(/Version\/(\d+)/);
    version = match ? match[1] : 'Unknown';
    isSupported = parseInt(version) >= 14;
  }
  // Edge
  else if (userAgent.includes('Edg')) {
    name = 'Edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    version = match ? match[1] : 'Unknown';
    isSupported = parseInt(version) >= 90;
  }
  else {
    isSupported = false;
  }

  return { name, version, isSupported };
}

// Check internet connectivity
export async function checkInternetConnection(): Promise<boolean> {
  try {
    const response = await fetch('https://js.puter.com/v2/', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    return true;
  } catch {
    try {
      // Fallback check
      const response = await fetch('https://www.google.com', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return true;
    } catch {
      return false;
    }
  }
}

// Check if JavaScript is enabled (always true if this runs)
export function checkJavaScript(): boolean {
  return true;
}

// Check if local storage is available
export function checkLocalStorage(): boolean {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// Check if cookies are enabled
export function checkCookies(): boolean {
  try {
    document.cookie = 'test=1';
    const enabled = document.cookie.includes('test=1');
    document.cookie = 'test=1; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    return enabled;
  } catch {
    return false;
  }
}

// Check device capabilities
export function getDeviceInfo() {
  return {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTablet: /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
    isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine
  };
}

// Comprehensive system check
export async function performSystemCheck(): Promise<SystemCheckResult> {
  const issues: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Browser check
  const browserInfo = getBrowserInfo();
  if (!browserInfo.isSupported) {
    issues.push(`متصفحك (${browserInfo.name} ${browserInfo.version}) قد لا يدعم جميع الميزات`);
    recommendations.push('يُنصح بتحديث المتصفح أو استخدام Chrome/Firefox/Safari الحديث');
  }

  // Internet connection check
  const hasInternet = await checkInternetConnection();
  if (!hasInternet) {
    issues.push('لا يوجد اتصال بالإنترنت');
    recommendations.push('تأكد من اتصالك بالإنترنت لاستخدام Puter.js');
  }

  // Local storage check
  if (!checkLocalStorage()) {
    warnings.push('التخزين المحلي غير متاح');
    recommendations.push('قد تفقد بعض الإعدادات عند إعادة تحميل الصفحة');
  }

  // Cookies check
  if (!checkCookies()) {
    warnings.push('ملفات تعريف الارتباط معطلة');
  }

  // Puter.js check
  if (!checkPuterJS()) {
    warnings.push('Puter.js غير محمل بعد');
    recommendations.push('سيتم تحميل Puter.js تلقائياً، أو يمكنك إعادة تحميل الصفحة');
  }

  // Device check
  const deviceInfo = getDeviceInfo();
  if (deviceInfo.isMobile) {
    recommendations.push('للحصول على أفضل تجربة، استخدم الجهاز في الوضع الأفقي');
  }

  if (deviceInfo.viewportWidth < 768) {
    warnings.push('الشاشة صغيرة - قد تحتاج للتمرير أكثر');
  }

  const isSupported = issues.length === 0;

  return {
    isSupported,
    issues,
    warnings,
    recommendations
  };
}

// Wait for Puter.js to load
export function waitForPuterJS(timeout: number = 10000): Promise<boolean> {
  return new Promise((resolve) => {
    if (checkPuterJS()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (checkPuterJS()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 100);
  });
}

// System health monitoring
export class SystemMonitor {
  private static instance: SystemMonitor;
  private checks: (() => boolean)[] = [];
  private interval: NodeJS.Timeout | null = null;

  static getInstance(): SystemMonitor {
    if (!SystemMonitor.instance) {
      SystemMonitor.instance = new SystemMonitor();
    }
    return SystemMonitor.instance;
  }

  addCheck(check: () => boolean): void {
    this.checks.push(check);
  }

  startMonitoring(intervalMs: number = 30000): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.checks.forEach(check => {
        try {
          check();
        } catch (error) {
          console.warn('System check failed:', error);
        }
      });
    }, intervalMs);
  }

  stopMonitoring(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}