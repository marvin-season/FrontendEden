import {player, send} from '@/utils/tts/tts-ws-node.js'
import {Button} from 'antd';

const TTS = () => {
  return <>

    <Button onClick={() => {
      send();
    }}>send</Button>
    <Button onClick={() => {
    player.pause().then(console.log).catch(console.log)
  }}>pause</Button>
  </>;
}

export default TTS;
