import babelParser from '@babel/parser';
import fs from "fs";
import {i18nTransformPlugin} from "./i18nTransformPlugin.js";
import {i18nCodeGeneratePlugin} from "./i18nCodeGeneratePlugin.js";

class CodeWalker {

    config = {
        src: ''
    }
    rawCode = undefined;

    constructor(config) {
        this.config = config;
        this.init();
    }

    init() {
        this.rawCode = fs.readFileSync(this.config.src, 'utf8');
        this.ast = babelParser.parse(this.rawCode, {
            sourceType: 'module', // default: "script"
            plugins: ['typescript', 'jsx'],
        });
    }

    use(plugin) {
        plugin.run(this);
        return this
    }
}


const codeWalker = new CodeWalker({src: '../src/pages/Demo.tsx'})
    .use(i18nTransformPlugin)
    .use(i18nCodeGeneratePlugin)
    .use({
        run: ({ast, config}) => {
            console.log("🚀  config", config)
        }
    });
