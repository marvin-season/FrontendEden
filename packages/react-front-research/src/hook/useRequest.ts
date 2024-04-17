export const useRequest = <T>(apiFunc: (...args: any) => Promise<T>) => {
    return async (...args: any) => {
        try {
            return await apiFunc.call(null, ...args);
        } catch (e) {
            console.error(e);

        } finally {
        }
    }
}
