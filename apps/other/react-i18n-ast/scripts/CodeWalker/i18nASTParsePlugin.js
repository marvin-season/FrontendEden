import fs from "fs";
import babelParser from "@babel/parser";

export const i18nASTParsePlugin = {
    run(ctx) {
        ctx.rawCode = fs.readFileSync(ctx.config.src, 'utf8');
        ctx.ast = babelParser.parse(ctx.rawCode, {
            sourceType: 'module', // default: "script"
            plugins: ['typescript', 'jsx'],
        });
    }
}
