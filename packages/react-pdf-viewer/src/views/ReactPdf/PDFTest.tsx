import {PDFViewer} from "@/components/PDFViewer/index.ts";
import {ChangeEventHandler, useState} from "react";
import {useDownLoadFile} from "@/hook/pdf";


function PDFTest() {
    const [hls, setHls] = useState([
        {
            url: "http://10.0.5.63:32099/smart-vision/ai-application/datasets/90421bde12614773a803166fca47dd81/H56b-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C-%E5%85%A8%E7%89%882023.11.8_1-43.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=OG3OEPE5JXXS3K12%2F20240308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240308T074538Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=a17b2b8144559f1139a1227514271acc198fbf321a450aefc0d1a8806e56a0ee",
            content: "。\n" +
                "充电指南\n" +
                "注意\n" +
                "● 请勿在便携式充电枪锁止状态下强行将其拔出，否则会损坏充电接口。\n" +
                "岚图汽车为您配备了专属交流充电桩，为您提供安全可靠的交流电源。充电\n" +
                "桩指示灯位于面板上（如下图箭头所示）"
        },
        {
            url: "http://10.0.5.63:32099/smart-vision/ai-application/datasets/90421bde12614773a803166fca47dd81/H56b-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C-%E5%85%A8%E7%89%882023.11.8_1-43.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=OG3OEPE5JXXS3K12%2F20240308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240308T074538Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=a17b2b8144559f1139a1227514271acc198fbf321a450aefc0d1a8806e56a0ee",
            content: "6 5 71 3 4 2\n" +
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
                "● 便携式充电电源插座参数需满足 220 V / 50 Hz / 10 A 或 16 A"
        },
        {
            url: "/math.pdf",
            content: "在导数这一章中的极限不会直接给出极限，而是会给出导数或函数的相关 定义，来求极限，再根据导数定义转换为导数。同时要注意这里不止会有导数定 义，还会有函数等性质。"
        },
        {
            url: "/math.pdf",
            content: "题目会给出对应的导数以及相关条件，并要求求一个极限，这个极限式子并\n" +
                "不是个随机的式子，而一个是与导数定义相关的极限式子"
        },
        {
            url: "/math.pdf",
            content: "这个部分在书上主要是跟隐函数共同出现。"
        }
    ])
    const [file, setFile] = useState<Blob>();
    const [currentIndex, setCurrentIndex] = useState(2);
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
                    {/*<textarea onKeyUp={(e) => {*/}

                    {/*}}/>*/}
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
