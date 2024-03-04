import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useState} from "react";

function App() {
    const [file, setFile] = useState<Blob>();
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let file: File | undefined = e.currentTarget.files?.[0];
        if (!file) {
            return
        }
        setFile(file)
    }

    return (
        <>
            <input type={'file'} onChange={handleFileChange}/>
            <PDFViewer searchText={'未正确处理，可能造成人员严重伤害甚至死亡。私自拆卸、拆解或随意丢\n' +
                '弃动力电池将会对环境造成污染，由此导致的环境污染或安全事故，应承\n' +
                '担相应责任'} file={file}/>
        </>
    )
}

export default App
