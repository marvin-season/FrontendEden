/* Created by iflytek on 2020/03/01.
 *
 * 运行前：请先填写 appid、apiSecret、apiKey
 *
 * 在线语音合成调用demo
 * 此demo只是一个简单的调用示例，不适合用到实际生产环境中
 *
 * 在线语音合成 WebAPI 接口调用示例 接口文档（必看）：https://www.xfyun.cn/doc/tts/online_tts/API.html
 * 错误码链接：
 * https://www.xfyun.cn/document/error-code （code返回错误码时必看）
 *
 */
import CryptoJS from 'crypto-js'
import PCMPlayer from 'pcm-player';
// 系统配置
const config = {
  // 请求地址
  hostUrl: "wss://tts-api.xfyun.cn/v2/tts",
  host: "tts-api.xfyun.cn",
  //在控制台-我的应用-在线语音合成（流式版）获取
  appid: "c9b5b44b",
  //在控制台-我的应用-在线语音合成（流式版）获取
  apiSecret: "ODJlM2I3ZGVmM2I1Y2JmODJhYzc4MGM2",
  //在控制台-我的应用-在线语音合成（流式版）获取
  apiKey: "e0de08061071616e5d92df2848d52b47",
  text: "你好<p>我是小燕<p>很高兴认识你",
  uri: "/v2/tts",
}

// 鉴权签名
export function getAuthStr(date) {
  let signatureOrigin = `host: ${config.host}\ndate: ${date}\nGET ${config.uri} HTTP/1.1`
  let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
  let signature = CryptoJS.enc.Base64.stringify(signatureSha)
  let authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
  let authStr = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin))
  return authStr
}

// 获取当前时间 RFC1123格式
let date = (new Date().toUTCString())
// 设置当前临时状态为初始化

export const wssUrl = config.hostUrl + "?authorization=" + getAuthStr(date) + "&date=" + date + "&host=" + config.host

let ws = {} || new WebSocket(wssUrl)

export const player = new PCMPlayer({
  inputCodec: 'Int16',
  channels: 2,
  sampleRate: 8000,
  flushTime: 2000
});

// 连接建立完毕，读取数据进行识别
ws.onopen = () => {
  console.log("websocket connect!")
}

// 得到结果后进行处理，仅供参考，具体业务具体对待
ws.onmessage = (event, err) => {
  const {data} = event
  if (err) {
    console.error('message error: ' + err)
    return
  }

  let res = JSON.parse(data)

  if (res.code !== 0) {
    console.error(`${res.code}: ${res.message}`)
    ws.close()
    return
  }
  let audio = res.data.audio
  let audioBuf = base64ToArrayBuffer(audio)
  console.log("🚀  res", res, audioBuf)

  player.feed(audioBuf);

  if (res.code === 0 && res.data.status === 2) {
    ws.close()
  }
}

// 资源释放
ws.onclose = () => {
  console.log('connect close!')
}

// 连接错误
ws.onerror = (err) => {
  console.error("websocket connect err: " + err)
}

function toBase64(text) {
  return window.btoa(unescape(encodeURIComponent(text)));
}

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// 传输数据
export function send() {
  let frame = {
    // 填充common
    "common": {
      "app_id": config.appid
    },
    // 填充business
    "business": {
      "aue": "raw",
      "auf": "audio/L16;rate=16000",
      "vcn": "xiaoyan",
      "tte": "UTF8"
    },
    // 填充data
    "data": {
      "text": toBase64(config.text),
      "status": 2
    }
  }
  console.log("🚀  ws send ", frame)
  ws.send(JSON.stringify(frame))
}
