const performChunks = ({
                           count,
                           taskHandler,
                           scheduler
                       }:
                           {
                               count: number,
                               taskHandler: (i: number) => void,
                               scheduler: (task: (isGoOn: () => boolean) => void) => void
                           }) => {
    let i = 0;

    const run = () => {
        if (i > count) {
            return
        }

        scheduler((isGoOn) => {
            while (isGoOn() && i <= count) {
                taskHandler(i);

                i += 1;
            }

            run();
        })
    }

    run()
}


export const browserScheduler = (task: (isGoOn: () => boolean) => void) => {
    requestIdleCallback((idle) => {
        task(() => idle.timeRemaining() > 0)
    })
}

export default performChunks
