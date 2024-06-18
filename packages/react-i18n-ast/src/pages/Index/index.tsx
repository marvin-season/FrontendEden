import {useTranslation} from "react-i18next";

export const IndexPage = () => {
    const {t} = useTranslation();
    return (<>
        {t('hi')}
    </>)
}
IndexPage.displayName = '首页'
