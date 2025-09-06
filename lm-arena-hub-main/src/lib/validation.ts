// Validation Utilities
// Input validation and sanitization

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ValidationRule {
  name: string;
  validator: (value: any) => boolean;
  message: string;
}

// Text validation rules
export const textValidationRules = {
  required: (value: string): boolean => {
    return value !== null && value !== undefined && value.trim().length > 0;
  },

  minLength: (min: number) => (value: string): boolean => {
    return value && value.length >= min;
  },

  maxLength: (max: number) => (value: string): boolean => {
    return !value || value.length <= max;
  },

  noHtml: (value: string): boolean => {
    const htmlRegex = /<[^>]*>/g;
    return !htmlRegex.test(value);
  },

  noScripts: (value: string): boolean => {
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    return !scriptRegex.test(value);
  },

  arabicText: (value: string): boolean => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(value);
  },

  englishText: (value: string): boolean => {
    const englishRegex = /[a-zA-Z]/;
    return englishRegex.test(value);
  },

  noSpecialChars: (value: string): boolean => {
    const specialCharsRegex = /[<>{}[\]\\\/]/;
    return !specialCharsRegex.test(value);
  }
};

// Validate prompt/question input
export function validatePrompt(prompt: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required check
  if (!textValidationRules.required(prompt)) {
    errors.push('يرجى كتابة سؤال أو مطالبة');
    return { isValid: false, errors, warnings };
  }

  // Length checks
  if (!textValidationRules.minLength(3)(prompt)) {
    errors.push('السؤال قصير جداً (الحد الأدنى 3 أحرف)');
  }

  if (!textValidationRules.maxLength(2000)(prompt)) {
    errors.push('السؤال طويل جداً (الحد الأقصى 2000 حرف)');
  }

  // Security checks
  if (!textValidationRules.noHtml(prompt)) {
    errors.push('لا يُسمح بكود HTML في السؤال');
  }

  if (!textValidationRules.noScripts(prompt)) {
    errors.push('لا يُسمح بكود JavaScript في السؤال');
  }

  // Content warnings
  if (prompt.length < 10) {
    warnings.push('السؤال قصير - قد تحصل على إجابة أفضل بسؤال أكثر تفصيلاً');
  }

  if (prompt.length > 1000) {
    warnings.push('السؤال طويل - قد يستغرق وقتاً أطول للمعالجة');
  }

  // Language detection
  const hasArabic = textValidationRules.arabicText(prompt);
  const hasEnglish = textValidationRules.englishText(prompt);

  if (!hasArabic && !hasEnglish) {
    warnings.push('لم يتم اكتشاف نص عربي أو إنجليزي - تأكد من صحة السؤال');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Validate image description
export function validateImageDescription(description: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required check
  if (!textValidationRules.required(description)) {
    errors.push('يرجى كتابة وصف للصورة المطلوبة');
    return { isValid: false, errors, warnings };
  }

  // Length checks
  if (!textValidationRules.minLength(5)(description)) {
    errors.push('وصف الصورة قصير جداً (الحد الأدنى 5 أحرف)');
  }

  if (!textValidationRules.maxLength(1000)(description)) {
    errors.push('وصف الصورة طويل جداً (الحد الأقصى 1000 حرف)');
  }

  // Security checks
  if (!textValidationRules.noHtml(description)) {
    errors.push('لا يُسمح بكود HTML في وصف الصورة');
  }

  if (!textValidationRules.noScripts(description)) {
    errors.push('لا يُسمح بكود JavaScript في وصف الصورة');
  }

  // Content guidelines
  const inappropriateWords = ['عنف', 'دم', 'قتل', 'violence', 'blood', 'kill'];
  const hasInappropriate = inappropriateWords.some(word => 
    description.toLowerCase().includes(word.toLowerCase())
  );

  if (hasInappropriate) {
    errors.push('وصف الصورة يحتوي على محتوى غير مناسب');
  }

  // Quality suggestions
  if (description.length < 20) {
    warnings.push('وصف أكثر تفصيلاً سيؤدي إلى صورة أفضل');
  }

  const hasColorMention = /لون|أحمر|أزرق|أخضر|أصفر|color|red|blue|green|yellow/i.test(description);
  if (!hasColorMention) {
    warnings.push('إضافة ألوان محددة قد يحسن جودة الصورة');
  }

  const hasStyleMention = /رسم|فن|تصوير|art|painting|photo|style/i.test(description);
  if (!hasStyleMention) {
    warnings.push('تحديد نوع الفن (رسم، تصوير، إلخ) قد يحسن النتيجة');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Validate model selection
export function validateModelSelection(modelId: string | null): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!modelId) {
    errors.push('يرجى اختيار نموذج لغوي');
    return { isValid: false, errors, warnings };
  }

  // Check if model ID is valid format
  const validModelPattern = /^[a-zA-Z0-9\-_.]+$/;
  if (!validModelPattern.test(modelId)) {
    errors.push('معرف النموذج غير صحيح');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  if (!input) return '';

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags specifically
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove potentially dangerous characters
    .replace(/[<>{}[\]\\]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Validate and sanitize prompt
export function validateAndSanitizePrompt(prompt: string): {
  isValid: boolean;
  sanitizedPrompt: string;
  errors: string[];
  warnings: string[];
} {
  const sanitizedPrompt = sanitizeInput(prompt);
  const validation = validatePrompt(sanitizedPrompt);

  return {
    isValid: validation.isValid,
    sanitizedPrompt,
    errors: validation.errors,
    warnings: validation.warnings
  };
}

// Validate chat message
export function validateChatMessage(message: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required check
  if (!textValidationRules.required(message)) {
    errors.push('يرجى كتابة رسالة');
    return { isValid: false, errors, warnings };
  }

  // Length checks
  if (!textValidationRules.minLength(1)(message)) {
    errors.push('الرسالة فارغة');
  }

  if (!textValidationRules.maxLength(2000)(message)) {
    errors.push('الرسالة طويلة جداً (الحد الأقصى 2000 حرف)');
  }

  // Security checks
  if (!textValidationRules.noHtml(message)) {
    warnings.push('تم إزالة كود HTML من الرسالة');
  }

  if (!textValidationRules.noScripts(message)) {
    errors.push('لا يُسمح بكود JavaScript في الرسالة');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Generic validator class
export class Validator {
  private rules: ValidationRule[] = [];

  addRule(rule: ValidationRule): Validator {
    this.rules.push(rule);
    return this;
  }

  validate(value: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const rule of this.rules) {
      try {
        if (!rule.validator(value)) {
          errors.push(rule.message);
        }
      } catch (error) {
        warnings.push(`خطأ في قاعدة التحقق: ${rule.name}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  static create(): Validator {
    return new Validator();
  }
}

// Pre-built validators
export const validators = {
  prompt: (prompt: string) => validatePrompt(prompt),
  imageDescription: (description: string) => validateImageDescription(description),
  modelSelection: (modelId: string | null) => validateModelSelection(modelId),
  chatMessage: (message: string) => validateChatMessage(message)
};