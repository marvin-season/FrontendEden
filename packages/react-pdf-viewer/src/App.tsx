import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useEffect, useState} from "react";


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
                    <PDFViewer searchText={searchText}
                               file={file || '/math.pdf'}/>
                </div>
            </div>
        </>
    )
}

export default App
