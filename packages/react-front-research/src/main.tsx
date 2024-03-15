import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Providers} from "./providers";
import {Greeter} from "@/ts-use/装饰器";

const greeter = new Greeter('张三');
console.log(greeter.greet())
for (const key in greeter) {
    console.log(key)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
      <Providers>
          <App/>
      </Providers>
  // </React.StrictMode>,
)
