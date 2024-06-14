import generator from "@babel/generator";

const generate = generator.default;

export const i18nCodeGeneratePlugin = {
    run({ast, config}) {
        config.transformed = generate(ast);
    }
}
