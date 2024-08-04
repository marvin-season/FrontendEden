import {t} from 'i18next';
import {name} from '../utils';

console.log('武汉', t("武汉"));

export const Demo = () => {
    const address = t("武汉");
    const renderFn = () => <>
        renderFn jsx
    </>;
    const ele = <>ele jsx</>;
    return <>
        <p>{name}</p>
        <p>{address}</p>
        <p>
            {`${t("我的名字：")}${name}`}
        </p>
        <div>
            <p>{t("东湖")}</p>
        </div>
        <p>{renderFn()}</p>
        <p>{ele}</p>
    </>;
};
