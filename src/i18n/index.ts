import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

import zh from './locales/zh.json'
import en from './locales/en.json'

const resources = {
  zh: { translation: zh },
  en: { translation: en },
}

i18n
  .use(HttpBackend) // 加载翻译文件
  .use(LanguageDetector) // 自动检测浏览器语言
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources,
    fallbackLng: 'zh', // 默认语言
    supportedLngs: ['zh', 'en'], // 支持的语言
    interpolation: {
      escapeValue: false, // React 已经自动处理 XSS
    },
    detection: {
      // 语言检测顺序
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // 缓存检测结果
    },
  })

export default i18n
