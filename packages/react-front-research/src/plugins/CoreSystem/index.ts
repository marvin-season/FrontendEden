export interface Plugin<T> {
    (system: CoreSystem, config: T): (system: CoreSystem, input: unknown) => void | unknown;
}

export class CoreSystem {

    attaches: [Plugin<any>, any?][] = []

    use<T>(plugin: Plugin<T>, config?: T) {
        this.attaches.push([plugin, config]);
        return this;
    }


    process(input: unknown) {

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
            return (<string>input).split(separator)
        }
    }, {separator: '-'})
    .use((system, config) => {
        return (system, input) => {
            return (<[]>input).join(config.glue)
        }
    }, {glue: '#'})

cs.process('hi-i-am')



















