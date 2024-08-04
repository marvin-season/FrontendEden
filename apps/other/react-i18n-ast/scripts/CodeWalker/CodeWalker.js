import babelParser from '@babel/parser';
import fs from "fs";
import {i18nTransformPlugin} from "./i18nTransformPlugin.js";
import {i18nCodeGeneratePlugin} from "./i18nCodeGeneratePlugin.js";
import {i18nASTParsePlugin} from "./i18nASTParsePlugin.js";

class CodeWalker {

    config = {
        src: ''
    }

    constructor(config) {
        this.config = config;
    }

    use(plugin) {
        plugin.run(this);
        return this
    }
}


export const getCodeWalker = (src, effective = false) => {
    return new CodeWalker({src})
        .use(i18nASTParsePlugin)
        .use(i18nTransformPlugin)
        .use(i18nCodeGeneratePlugin)
        .use({
            run({config}) {
                console.log("🚀  正在写入文件: \n", config.src)
                console.log(config.transformed.code);
                effective && fs.writeFileSync(config.src, config.transformed.code);
            }
        })
}
