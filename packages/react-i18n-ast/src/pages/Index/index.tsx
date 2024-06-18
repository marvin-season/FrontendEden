import {useTranslation} from "react-i18next";

export const IndexPage = () => {
    const {t} = useTranslation();
    return (<>
        {t('你   .好.他')}
    </>)
}
IndexPage.displayName = '首页'
