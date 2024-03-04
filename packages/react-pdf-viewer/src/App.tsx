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
            <PDFViewer searchText={'为保证动力电池更佳的使用性能，在较低温度下充电时，车辆会开启动力\n' +
                '电池加热功能，因此充电时间会延长'} file={file}/>
        </>
    )
}

export default App
