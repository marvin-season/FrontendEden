import {useState} from "react";
import {Flex} from "@/styled";
import './index.css'

const EmojiPanel = () => {
    const [img, setImg] = useState<string>();
    const [imgWidth, setImgWidth] = useState<number>(300)
    return <Flex>
        <div className={'emoji'}>
            <img width={imgWidth} src={img} alt="不见了"/>
            <div contentEditable={true} style={{width: imgWidth}} className={'emoji_mask'}></div>
        </div>
        <div style={{width: '20%'}}>
            <input type="file" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    setImg(url)
                }
            }}/>
        </div>

    </Flex>
}
export default EmojiPanel
