export interface Plugin<T> {
    (system: CoreSystem, config: T): (system: CoreSystem, input: unknown) => void | unknown;
}

export class CoreSystem {
    data: Record<string, any> = {};
    attaches: [Plugin<any>, any?][] = []

    use<T>(plugin: Plugin<T>, config?: T) {
        this.attaches.push([plugin, config]);
        return this;
    }


    async process(input: unknown) {

        let i = 0;
        let output = input;

        do {
            // pipe: input => output as input => output
            const [plugin, config] = this.attaches[i];
            output = plugin(this, config)(this, output) || output;
            i += 1;

        } while (i >= 0 && i < this.attaches.length);

        return Promise.resolve(output);
    }
}



















