import {Demo} from "./pages/Demo.tsx";
import i18n from "i18next";
import {IndexPage} from "./pages/Index";

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

            <IndexPage/>
        </div>
    );
}

export default App;
