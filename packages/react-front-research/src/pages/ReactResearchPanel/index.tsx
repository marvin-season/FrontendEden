import React, {memo, useState} from "react";
import {Page as Page_} from "@/pages/ReactResearchPanel/Page.tsx";
import {Button} from "antd";

const Page = React.memo(Page_)

const SomeLabel = memo<{ value: number }>(({value}) => {
    console.log('SomeLabel')
    return <h2>SomeLabel:{value}</h2>
})

const ReactResearchPanel = memo(() => {
    const [searchText, setSearchText] = useState('')
    const [pages, setPages] = useState([1, 2, 3]);
    return <>

        <Button onClick={() => {
            setSearchText('hi')
        }}>
            {searchText} 'click'
        </Button>
        {
            pages.map(page => {
                return <Page key={page} pageNumber={page}/>
            })
        }

    </>
})
export default ReactResearchPanel
