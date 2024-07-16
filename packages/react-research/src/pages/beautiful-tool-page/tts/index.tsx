import {Button} from 'antd';
import {TTSMonitor} from '@/utils/tts/TTS.ts'

const TTS = () => {
  return <>

    <Button onClick={() => {
      TTSMonitor.getInstance().send('你好<p>我是小燕<p>很高兴认识你')
    }}>send</Button>
    <Button onClick={() => {
      TTSMonitor.getInstance().pause?.().then(console.log).catch(console.log)
    }}>pause</Button>
  </>;
}

export default TTS;
