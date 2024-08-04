import i18n from "i18next";
import {IndexPage} from "./pages/Index";
import {Demo} from "./pages/Demo.tsx";

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
                                style={{fontWeight: i18n.resolvedLanguage === lng ? 'bolder' : 'normal'}}/>
                    ))}
                </select>
            </header>
            <Demo/>
        </div>
    );
}

export default App;
