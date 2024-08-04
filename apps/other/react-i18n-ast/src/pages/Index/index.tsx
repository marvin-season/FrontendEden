import {t} from "i18next";

console.log('武汉', t("武汉"));


export const IndexPage = () => {
    return (<>
        {t("武汉")}
    </>)
}
IndexPage.displayName = '首页'
