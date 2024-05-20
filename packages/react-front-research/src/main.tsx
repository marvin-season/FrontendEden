import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "antd";
import {Providers} from "@/providers";
// import "@/test/stream.ts"


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Providers>
            <App/>
        </Providers>
    </React.StrictMode>,
)

