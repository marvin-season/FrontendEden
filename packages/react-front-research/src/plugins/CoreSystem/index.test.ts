import {CoreSystem} from "@/plugins/CoreSystem/index.ts";
import {test} from "vitest";

const cs = new CoreSystem()
    .use((system, {separator}) => {
        return (system, input) => {
            system.data.separator = separator;
            return (<string>input).split(separator)
        }
    }, {separator: '-'})
    .use((system, {glue}) => {
        return (system, input) => {
            system.data.glue = glue;
            return (<[]>input).join(glue)
        }
    }, {glue: '#'})


test('CoreSystem', async () => {
    const data = await cs.process('hi-i-am');
    console.log(cs, data);
})
