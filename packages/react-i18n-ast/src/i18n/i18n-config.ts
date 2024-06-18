import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from "moment";
import {resources} from "./resources.ts";

i18n
    // 检测用户当前使用的语言
    // 文档: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // 注入 react-i18next 实例
    .use(initReactI18next)
    // 初始化 i18next
    // 配置参数的文档: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources
    });

i18n.services.formatter?.add('DD/MM/YYYY', (value) => {
    return moment(value).format('DD/MM/YYYY')
})

i18n.services.formatter?.add('YYYY-MM-DD', (value) => {
    return moment(value).format('YYYY-MM-DD')
})
export default i18n;
console.log('你   .好.他',i18n.t('你   .好.他'));
