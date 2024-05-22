import Demo from "./pages/Demo.tsx";
import i18n from "i18next";
import {Page1} from "./pages/Page1.tsx";

const lngs: any = {
    en: {nativeName: 'English'},
    zh: {nativeName: '中文'}
};

function App() {
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
            <Demo/>
            <Page1/>
        </div>
    );
}

export default App;
