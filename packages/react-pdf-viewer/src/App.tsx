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
            <PDFViewer searchText={'恭喜您拥有一辆电动豪华旗舰 MPV，感谢您对岚图汽车的信任与支持！\n' +
                '正确合理地使用车辆不仅能给您带来十足的驾乘乐趣和舒适性，还能延\n' +
                '长车辆使用寿命。因此，请您在使用车辆之前，务必仔细阅读本手册。\n' +
                '本手册所提供的信息，对保障您的驾乘安全'} file={file}/>
        </>
    )
}

export default App
