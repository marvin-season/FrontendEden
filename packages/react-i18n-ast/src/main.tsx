import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import {t} from "i18next";
console.log('武汉', t("武汉"));

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>
    <App/>
</React.StrictMode>);
