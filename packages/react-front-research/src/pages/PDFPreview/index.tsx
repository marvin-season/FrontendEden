import React, {useEffect, useState} from "react";
import {PdfViewer} from "@/components/pdf/PdfViewer.tsx";
import pdf from '/demo2.pdf'

const keywords = {
    demo6: '了众多超级极客和高瞻远瞩的商业领袖'
}

function Index() {
    const [value, setValue] = useState(keywords.demo6)

    const [url, setUrl] = useState('/demo2.pdf')
    const [file, setFile] = useState<Blob>()

    return <div>
        <input type={"file"} onChange={(e) => {
            let file = e.currentTarget.files?.[0];
            if(file){
                let blob = new Blob(['hello'], {type: file.type});
                console.log(blob, file.type)
                setFile(blob)
            }
        }}/>
        <button onClick={() => {
            setUrl('/demo.pdf')
        }}>toggle</button>
        <div style={{height: `500px`, overflow: "auto",}}>
            <PdfViewer url={file}
                       width={800} searchText={value}/>;
        </div>

    </div>
}

export default Index;
