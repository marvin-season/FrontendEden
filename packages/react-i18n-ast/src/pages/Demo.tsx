import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
export default function Demo() {
  const {
    t
  } = useTranslation();
  const name = t("咕咕鸡");
  const habit = t("跑步");
  const description = `${name}${t("是个boy")}`;
  return <>
            <h2>{t("关于")}</h2>
            <p>
                 {`${t("我的名字：")}${name}`}, {t("我的兴趣")}{habit + t("网球")}
            </p>
            <p>{description}</p>
            <Input placeholder={t("请输入你的年龄")} />
        </>;
}