# 使用Ollama快速部署本地大模型

## 宿主机安装Ollama
[下载 ollama](https://ollama.com/download)
```shell
ollama list # （查看本地大模型） 
ollama ps #（查看运行中的大模型）
```
[下载 ollama 提供的模型](https://ollama.com/library)
```shell
ollama run modelId #（运行模型）自动下载模型并运行
```

## docker 部署

Ollama
```shell
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```
Chat UI
```shell
docker pull ghcr.io/ollama-webui/ollama-webui:main
```
