import {createOllama} from "ollama-ai-provider";
import {createAzure} from "@ai-sdk/azure";

const LLMMapping = {
  'ollama': () => createOllama({
    baseURL: 'http://127.0.0.1:11434/api',
  }),
  'azure': () => createAzure({
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/`,
    apiKey: process.env.AZURE_OPENAI_KEY,
  })
}
type ProviderType = keyof typeof LLMMapping;


export class LLMFactory {
  static createOllamaLLM() {
    return LLMMapping['ollama']()('llama3.1:8b');
  }

  static createAzureLLM() {
    return LLMMapping['azure']()('GPT-4');
  }
}

