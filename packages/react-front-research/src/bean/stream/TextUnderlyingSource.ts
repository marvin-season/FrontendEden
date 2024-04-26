import moment from "moment";

export class TextUnderlyingSource implements UnderlyingDefaultSource {
    private interval: any;

    start(controller: ReadableStreamDefaultController) {
        console.log("[start]", controller);

        this.interval = setInterval(() => {
            controller.enqueue(new TextEncoder().encode(moment().format("YYYY-MM-DD HH:mm:ss")));
        }, 2_000);
    }


    pull(controller: ReadableStreamDefaultController<any>): void | PromiseLike<void> {
        // console.log("[pull]")

        return undefined;
    }

    cancel(reason: any) {
        clearInterval(this.interval)
        console.log("[cancel]", reason)
    }


}
