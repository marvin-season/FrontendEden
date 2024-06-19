export class Emitter {
    constructor(max) {
        this.max = max;
        this.syncIdx = 0;
        this.asyncIdx = 0;

    }

    * [Symbol.iterator]() {
        while (this.syncIdx < this.max) {
            yield this.syncIdx++;
        }
    }

    async* [Symbol.asyncIterator]() {
        while (this.asyncIdx < this.max) {
            if(this.asyncIdx <= 5){
                yield new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(this.asyncIdx++);
                    }, Math.floor(Math.random() * 1000));
                });
            } else {
                throw 'Exited Loop!'
            }

        }
    }
}
