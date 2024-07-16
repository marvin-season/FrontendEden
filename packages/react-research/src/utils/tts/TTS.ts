// @ts-ignore
import CryptoJS from 'crypto-js';
import PCMPlayer from 'pcm-player';
import {player} from '@/utils/tts/tts-ws-node';
import {base64ToArrayBuffer, toBase64} from '@/utils/file.ts';
import mitt from 'mitt';

const bus = mitt()

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
export function getAuthStr(date: string) {
  let signatureOrigin = `host: ${config.host}\ndate: ${date}\nGET ${config.uri} HTTP/1.1`
  let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
  let signature = CryptoJS.enc.Base64.stringify(signatureSha)
  let authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin))
}

// 获取当前时间 RFC1123格式
let date = (new Date().toUTCString())
// 设置当前临时状态为初始化

export const wssUrl = config.hostUrl + "?authorization=" + getAuthStr(date) + "&date=" + date + "&host=" + config.host


export class TTSMonitor {
  static instance: TTSMonitor | null = null;

  ws: WebSocket | null = null;
  private wssUrl = wssUrl;
  private player: PCMPlayer | null = null;
  private text: string = ''

  status: 'Running' | 'Idle' = 'Idle';


  public static getInstance() {
    if (!TTSMonitor.instance) {
      TTSMonitor.instance = new TTSMonitor()
    }

    return TTSMonitor.instance
  }

  private constructor() {
    this.ws = new WebSocket(this.wssUrl);
    this.ws.onopen = this.onopen
    this.ws.onmessage = this.onmessage
    this.ws.onerror = this.onerror
    this.ws.onclose = this.onclose;

    this.player = new PCMPlayer({
      fftSize: 1024,
      inputCodec: 'Int16',
      channels: 2,
      sampleRate: 8000,
      flushTime: 2000
    });
  }

  onopen = () => {
    console.log("🚀  connect ws")
    bus.emit('connect')
  }

  onmessage = (event: MessageEvent) => {
    const {data} = event
    if (!this.ws) {
      console.error('message error: ')
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

    // if (res.code === 0 && res.data.status === 2) {
    //   this.ws.close()
    // }
  }

  onerror(error: any) {
    console.log("🚀  ", "ws error", error)
  }

  onclose() {
    console.log("🚀  ", "close ws")
  }

  handleSend = (text: string) => {
    if (!this.ws) return;
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
        "text": toBase64(text),
        "status": 2
      }
    }
    console.log("🚀  ws send ", frame)
    this.ws.send(JSON.stringify(frame))
  }

  send = (text: string) => {
    bus.on('connect', () => {
      console.log("🚀  bus event connect")
      this.handleSend(text)
    })
  }

  pause = this.player?.pause;
}
