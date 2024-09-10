import React, {FC} from "react";

export const FileSelector: FC<{
    children?: React.ReactElement | string,
    onChange?: (files: FileList) => void,
    accept?: string
}> = ({children, accept, onChange}) => {
    return <>
        <label htmlFor="file-upload">
            {children}
            <input style={{display: 'none'}} accept={accept} id="file-upload" type="file" multiple={true}
                   onChange={(e) => {
                       e.currentTarget.files && onChange?.(e.currentTarget.files)
                   }}/>
        </label>
    </>
}
