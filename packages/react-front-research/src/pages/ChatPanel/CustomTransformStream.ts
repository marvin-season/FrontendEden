import {Types} from '@root/react-ui';

export const stringToObjectTransformer: Transformer<string, Types.IMessage> = {
    transform(chunk, controller) {
        const data = JSON.parse(chunk)
        controller.enqueue(data)
    }
}
