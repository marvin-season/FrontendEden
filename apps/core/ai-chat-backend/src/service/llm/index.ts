import {createOllama} from "ollama-ai-provider";
import {createAzure} from "@ai-sdk/azure";

const LLMConfig = {
  'ollama': {
    baseURL: `${process.env.OLLAMA_ENDPOINT}/api`,
  },
  'azure': {
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/`,
    apiKey: process.env.AZURE_OPENAI_KEY,
  }
}

export class LLMFactory {
  static createOllama(modelId = 'llama3.1:8b') {
    return createOllama(LLMConfig.ollama)(modelId);
  }

  static createAzure(modelId = 'GPT-4') {
    return createAzure(LLMConfig.azure)(modelId);
  }
}

