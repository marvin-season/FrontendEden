import React, {FC} from "react";
import {FileInput, FileInputSelector} from "@/components/chat/styled.ts";

export const FileSelector: FC<{
    children?: React.ReactElement | string,
    onChange?: (files: FileList) => void,
    accept?: string
}> = ({children, accept, onChange}) => {
    return <>
        <FileInputSelector htmlFor="file-upload">
            {children ? children : <span>选择文件</span>}
            <FileInput accept={accept} id="file-upload" type="file" multiple={true} onChange={(e) => {
                e.currentTarget.files && onChange?.(e.currentTarget.files)
            }}/>
        </FileInputSelector>
    </>
}
