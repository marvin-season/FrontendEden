import {Button} from 'antd';
import {TTSMonitor} from '@/utils/tts/TTS.ts'

const tts = new TTSMonitor();
const TTS = () => {
  return <>

    <Button onClick={() => {
      tts.send('你好<p>我是小燕<p>很高兴认识你')
    }}>send</Button>
    <Button onClick={() => {
      tts.getPlayer().pause().then(console.log).catch(console.log)
    }}>pause</Button>
    <Button onClick={() => {
      tts.getPlayer().continue().then(console.log).catch(console.log)
    }}>continue</Button>
  </>;
}

export default TTS;
