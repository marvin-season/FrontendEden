import {PDFViewer} from "@/components/PDFViewer/index.ts";
import {ChangeEventHandler, useState} from "react";
import {useDownLoadFile} from "@/hook/pdf";


function PDFTest() {
    const [hls, setHls] = useState([
        {
            url: "http://10.0.5.63:32099/smart-vision/ai-application/datasets/20ae8de22998476ca8ec9475e89ce934/%E4%B8%8E%E5%87%A4%E8%A1%8C1.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=OG3OEPE5JXXS3K12%2F20240322%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240322T081227Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=1471e238b2b133343abc4b2961f3a8b15347a5c5d9f0b49f7eaeb78b101f6d4d",
            content: "她第⼀次把离开的话出⼝，⾏云⼀愣，只⻅她⼿⼀挥，银⽩的光华在她⼿中凝聚，不过⼀瞬，⼀杆红缨银枪蓦地出现在她⼿中，枪上森森寒⽓逼⼈，印着⽕光，在沈璃⼿中⼀转，流转出了⼀丝锋利的杀⽓。\n" +
                "　　沈璃脚下⽤⼒，径直撞破屋顶跃上空中，⼿中银枪在空中划出四条痕迹，她⼀声低喝，四道银光如章印下，⾏云的⼩院四周院墙轰然坍塌，与周围的房⼦隔开了两尺来宽的距离。今夜⽆⻛，这⾥的⽕燃不到别⼈家去了。\n" +
                "　　沈璃身形⼀闪，落在院中，此时没了院墙的阻隔，她清清楚楚看⻅了外⾯的⼈，数⼗名侍卫，握着⼸箭，颤抖着往后退却，唯有⼀名⻘年站在⼈群之外，冷眼将她盯着。"
        },
        {
            url: "http://10.0.5.63:32099/smart-vision/ai-application/datasets/20ae8de22998476ca8ec9475e89ce934/%E4%B8%8E%E5%87%A4%E8%A1%8C1.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=OG3OEPE5JXXS3K12%2F20240322%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240322T081227Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=1471e238b2b133343abc4b2961f3a8b15347a5c5d9f0b49f7eaeb78b101f6d4d",
            content: "院⻔微开，外⾯有嘈杂的响动，沈璃在⻔缝中偷偷将脑袋探了出去，⽕把的光照亮巷陌，两辆⻢⻋停在巷⾥，昨⽇⻅到的布⾐姑娘正和她娘站在⼀起，家⾥的男丁正在往⻢⻋上装放东⻄，⽽⾏云正在其中帮忙，待得东⻄都装放好后，别的⼈都陆陆续续的上⻋，只有那姑娘和她娘还站在外⾯。\n" +
                "　　“⾏云，你爹娘去得早，这些年虽为邻⾥，但我们也没能帮得上你什么忙，现在想来很是愧疚，此⼀去怕是再⽆法相⻅，你以后千万多多保重。”\n" +
                "　　“⼤娘放⼼，⾏云知道。”他笑着应了⼀句，中年⼥⼦似极为感怀，⼀声叹息，掩⾯上⻋。独留⼩姑娘与⾏云⾯对⾯站着。\n" +
                "　　姑娘垂头着头⼀⾔不发，⽕把跳跃的光芒映得她眼中⼀⽚潋滟。"
        },
    ])
    const [file, setFile] = useState<Blob>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchText, setSearchText] = useState('')


    useDownLoadFile(hls[currentIndex].url, setFile);

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let file: File | undefined = e.currentTarget.files?.[0];
        if (!file) {
            return
        }
        setFile(file)
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: "space-around", flexDirection: "row-reverse"}}>
                <div style={{
                    overflow: 'auto',
                    width: '500px'
                }}>
                    <input type={'file'} onChange={handleFileChange}/>
                    <div>
                        <textarea value={searchText} onChange={(e) => {
                            setSearchText(e.currentTarget.value)
                        }}/>
                        <button onClick={() => {
                            hls.push({
                                content: searchText,
                                url: ''
                            })
                            setSearchText('')
                        }}>添加
                        </button>
                    </div>
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

                <PDFViewer
                    width={800}
                    searchText={hls[currentIndex].content}
                    file={file}/>
            </div>
        </>
    )
}

export default PDFTest
