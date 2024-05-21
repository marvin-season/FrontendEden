import {Trans, useTranslation} from 'react-i18next';
import moment from "moment";

const lngs: any = {
    en: {nativeName: 'English'},
    zh: {nativeName: '中文'}
};

function App() {
    const {t, i18n} = useTranslation();
    return (
        <div>
            <header>
                <select onChange={(evt) => {
                    i18n.changeLanguage(evt.target.value).then()
                }}>
                    {Object.keys(lngs).map((lng) => (
                        <option key={lng} value={lng} label={lngs[lng].nativeName}
                                style={{fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}/>
                    ))}
                </select>
            </header>
            <main>
                <p>
                    {t('welcome')}
                </p>
                <div>
                    <Trans i18nKey="key1">
                        = <span></span>
                    </Trans>
                </div>
                <p>
                    {t('currentTime', {time: moment().format('MM/DD/YYYY')})}
                </p>

                <Trans i18nKey="author">
                    作者是: <span></span>
                </Trans>
            </main>
        </div>
    );
}

export default App;
