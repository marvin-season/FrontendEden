export interface Plugin {
    (system: CoreSystem, config: any): (system: CoreSystem, input: any) => void | any;
}

export class CoreSystem {

    attaches: [Plugin, Record<string, any>?][] = []

    use(plugin: Plugin, config?: Record<string, any>) {

        this.attaches.push([plugin, config]);
        return this;
    }


    process(input: any) {

        let i = 0;
        let output = input;

        do {
            const [plugin, config] = this.attaches[i];
            output = plugin(this, config)(this, output) || output;
            i += 1;

        } while (i >= 0 && i < this.attaches.length);

        return output;
    }
}

export const cs = new CoreSystem()
    .use((system, {separator}) => {
        return (system, input) => {
            return input.split(separator)
        }
    }, {separator: '-'})
    .use((system, config) => {
        return (system, input) => {
            return input.join(config.glue)
        }
    }, {glue: '#'})




















