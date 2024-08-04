import {Button} from 'antd';
import {TTSMonitor} from '@/utils/tts/TTS.ts'
import {useState} from 'react';
import {generateRandomTextWithCallback} from '@/utils/ContentGenerator.ts';

const tts = new TTSMonitor();
const TTS = () => {
  const [content, setContent] = useState('');
  return <>
    <div>{content}</div>
    <Button onClick={() => {
      setContent('')
      generateRandomTextWithCallback(['六出祁山', '千里走单骑'], item => {
        setContent(prevState => prevState.concat(item?.content || ''))
      })
    }}>start</Button>
    <Button onClick={() => {
      tts.readAloud(content).then()
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
