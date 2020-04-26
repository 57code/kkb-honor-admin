import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/cookies'

// element-ui built-in lang
// element-ui内置的语言包
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEsLocale from 'element-ui/lib/locale/lang/es'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'

// User defined lang
// 用户自定义语言包
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import jaLocale from './ja'

// 注册插件
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale
  }
}

// 获取语言设置
export const getLocale = () => {
  // 默认获取cookie中语言设置
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }

  // 浏览器语言设置
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'en'
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages
})

export default i18n
