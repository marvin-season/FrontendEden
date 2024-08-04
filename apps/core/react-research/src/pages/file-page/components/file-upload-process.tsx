import {useDownload} from "@/hook/useDownload.ts";
import {Button, Card, Flex, Progress} from "antd";
import React, {useState} from "react";

export default function FileUploadProcess() {
    const {download, cancel} = useDownload((receivedLength, totalLength) => {
        setDownloadPercent(Math.floor(100 * receivedLength / totalLength));
    }, () => {
        console.log("下载完成")
    }, () => {
        console.log("下载取消");
        setDownloadPercent(0)
    });

    const [downloadPercent, setDownloadPercent] = useState<number>(0)

    const handleDownload = () => download('/api2/demo.mov', {}).then(console.log);

    return <Flex gap={10}>
        <Button type={"primary"} onClick={handleDownload}>下载</Button>
        <Button onClick={cancel}>取消</Button>
        <Card>
            <Progress type="circle" percent={downloadPercent}/>
        </Card>
    </Flex>
}
