import {PDFViewer} from "@/components/PDFViewer/index.ts";
import {ChangeEventHandler, useState} from "react";


function App() {
    const [hls, setHls] = useState([
        "。\n" +
        "充电指南\n" +
        "注意\n" +
        "● 请勿在便携式充电枪锁止状态下强行将其拔出，否则会损坏充电接口。\n" +
        "岚图汽车为您配备了专属交流充电桩，为您提供安全可靠的交流电源。充电\n" +
        "桩指示灯位于面板上（如下图箭头所示）",
        "6 5 71 3 4 2\n" +
        " cb\n" +
        "da\n" +
        "① 充电连接插头\n" +
        "② 解锁按键\n" +
        "③ 电源插头\n" +
        "④ 充电线缆\n" +
        "⑤ 充电枪适配器\n" +
        "⑥ 充电枪指示灯\n" +
        "    a.  连接指示灯（绿色）\n" +
        "    b.  电源指示灯（绿色）\n" +
        "    c.  充电指示灯（绿色）\n" +
        "    d.  故障指示灯（红色）\n" +
        "⑦ 保护盖便携式充电枪\n" +
        "提示\n" +
        "● 本车未配备便携式充电枪， 如有需要， 可通过岚图汽车 APP 兑换或购买。\n" +
        "● 便携式充电电源插座参数需满足 220 V / 50 Hz / 10 A 或 16 A",
        "在导数这一章中的极限不会直接给出极限，而是会给出导数或函数的相关 定义，来求极限，再根据导数定义转换为导数。同时要注意这里不止会有导数定 义，还会有函数等性质。",
        "求高阶导数基本上使用归纳法或莱布尼茨公式。"
    ])
    const [file, setFile] = useState<Blob>();
    const [searchText, setSearchText] = useState<string>()
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let file: File | undefined = e.currentTarget.files?.[0];
        if (!file) {
            return
        }
        setFile(file)
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: "space-between"}}>
                <div style={{
                    overflow: 'auto',
                    width: '500px'
                }}>
                    <input type={'file'} onChange={handleFileChange}/>
                    <textarea onKeyUp={(e) => {
                        if (e.key.toLowerCase() === 'enter') {
                            setHls(hls.concat([(e.target as HTMLTextAreaElement).value]))
                        }
                    }}/>
                    {
                        hls.map(item => <div
                            onClick={() => {
                                setSearchText(item)
                            }}
                            key={item}
                            style={{
                                border: item === searchText ? 'blue solid 2px' : '1px black dashed',
                                padding: '10px',
                                cursor: 'pointer',
                            }}>
                            {item}
                        </div>)
                    }
                </div>

                <div style={{
                    height: '800px',
                    overflow: 'auto'
                }}>
                    <PDFViewer
                    width={800}
                        searchText={searchText}
                               file={file || 'http://10.0.5.63:32099/smart-vision/ai-application/datasets/7297960218f046e09a2002bb11dca4f9/H56b-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C-%E5%85%A8%E7%89%882023.11.8_1-43.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=OG3OEPE5JXXS3K12%2F20240307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240307T060717Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=c6a2882a8b6dafe752b9dab396afa3a04a3afcf76de0730480954abc5c1be4d5'}/>
                </div>
            </div>
        </>
    )
}

export default App
