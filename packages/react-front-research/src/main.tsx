import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Providers} from "./providers";
import {PostChat} from "@/bean/PostChat.ts";

const params = {};
const postChat = new PostChat('/api/apps/complex/chat', params, console.log);
console.log(postChat)

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Providers>
        <App/>
    </Providers>
    // </React.StrictMode>,
)
