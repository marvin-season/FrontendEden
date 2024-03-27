import {PDFViewer} from "@/components/PDFViewer/index.ts";
import {ChangeEventHandler, useState} from "react";


function PDFTest() {
    const [hls, setHls] = useState<{
        content: string,
    }[]>([
        {
            content: '此处已有你说的那种阵法'
        },
        {
            content: '谁要你施舍了!'
        },

    ])
    const [file, setFile] = useState<Blob | string>('/与凤行.pdf');
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
        </>
    )
}

export default PDFTest
