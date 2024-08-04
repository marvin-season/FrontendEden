import {Page, PageProps} from "react-pdf";
import {FC, useEffect} from "react";

export const PDFPage: FC<PageProps & {
    searchText: string
}> = (props) => {
    useEffect(() => {
        console.log('searchText', props);
    }, []);
    return <Page {...props}/>
}
