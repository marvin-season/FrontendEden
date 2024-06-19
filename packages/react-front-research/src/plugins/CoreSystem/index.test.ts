import {CoreSystem} from "@/plugins/CoreSystem/index.ts";
import {test} from "vitest";

const cs = new CoreSystem()
    .use((system, {separator}) => {
        return (system, input) => {
            return (<string>input).split(separator)
        }
    }, {separator: '-'})
    .use((system, config) => {
        return (system, input) => {
            return (<[]>input).join(config.glue)
        }
    }, {glue: '#'})


test('CoreSystem', () => {
    console.log(cs.process('hi-i-am'));
})
