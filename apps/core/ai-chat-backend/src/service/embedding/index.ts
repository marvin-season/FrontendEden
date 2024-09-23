import {embed, EmbeddingModel, cosineSimilarity} from "ai";

export const generateEmbedding = async (value: string, embeddingModel: EmbeddingModel<any>): Promise<number[]> => {
    const input = value.replaceAll('\\n', ' ');

    const {embedding} = await embed({
        model: embeddingModel,
        value: input,
    });
    return embedding;
};