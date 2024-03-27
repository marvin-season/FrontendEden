import {PDFViewer} from "@/components/PDFViewer/index.ts";
import {ChangeEventHandler, useState} from "react";


function PDFTest() {
    const [hls, setHls] = useState<{
        content: string,
    }[]>([
        {
            content: '这⾏⽌君独居天外天已经数不清有好多年了！他根本就不知道天界谁是谁吧！更别提魔界了！他到底是怎么定的⼈选啊！这⽼⼈家偶尔⼼⾎来潮来天界议个事，竟议毁了他的⼀⽣啊！\n' +
                '　　不过事到如今毁也毁成这样了，拂容君⼼道，难怪天帝今⽇⽐往⽇更⽣⽓⼀些，原来是怕他这违背⾏⽌君⼼意的话触了⾏⽌君逆鳞。但是既然知道这亲是谁定的，那就直接求求这幕后之⼈吧'
        },
        {
            content: '谁要你施舍了!'
        },
        {
            content: '。”\n' +
                '　　沈璃眺望远处京城，⼿臂⼀伸，红缨⻓枪⻜回她的掌⼼，五指⽤⼒，握住⻓枪，沈璃凭空⼀跃，身影只在空中留下⼀场疾⻛。待她消失之后众仙皆嘀嘀咕咕的讨论起来：\n' +
                '　　“这到底是哪⾥来的家伙啊，⼀身煞⽓好吓⼈。”\n' +
                '　　“⼀看就是魔界的⼈呐！霸道⼜横蛮……湖⿅你没受什么伤吧？”\n' +
                '　　“唔，嗯，没事'
        }

    ])
    const [file, setFile] = useState<Blob | string>('http://10.0.5.63:31548/smart-vision/ai-application/datasets/ec36ecc1287e483ea893f8cdbd9ab5c2/%E4%B8%8E%E5%87%A4%E8%A1%8C.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AHMKZINMGO355MTE%2F20240327%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240327T085430Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=86e8428b38853545bc67a0ee33c0da3c12b0c8059566d60bcf24a51bf457642d');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchText, setSearchText] = useState('')


    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let file: File | undefined = e.currentTarget.files?.[0];
        if (!file) {
            return
        }
        setFile(file)
    }

    return (
        <>
            <div style={{display: 'flex', gap: '20px'}}>
                <div style={{
                    overflow: 'auto',
                    height: '800px'
                }}>
                    <PDFViewer
                        width={800}
                        searchText={hls[currentIndex].content}
                        file={file}/>
                </div>


                <div>
                    <input type={'file'} onChange={handleFileChange}/>

                    <textarea value={searchText} onChange={(e) => {
                        setSearchText(e.currentTarget.value)
                    }}/>
                    <button onClick={() => {
                        hls.push({
                            content: searchText,
                        })
                        setSearchText('')
                    }}>添加
                    </button>
                    <div style={{maxWidth: '600px'}}>

                        {
                            hls.map((item, index) => <div
                                onClick={() => {
                                    setCurrentIndex(index)
                                }}
                                key={index}
                                style={{
                                    border: currentIndex === index ? 'blue solid 2px' : '1px black dashed',
                                    padding: '10px',
                                    cursor: 'pointer',
                                }}>
                                {item.content}
                            </div>)
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default PDFTest
