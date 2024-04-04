import React, {FC, useEffect} from "react";

export const Page: FC<{ pageNumber: number }> = ({pageNumber}) => {
    console.log('pageNumber', pageNumber)
    useEffect(() => {
        console.log('useEffect pageNumber', pageNumber)

    }, [pageNumber]);
    return <>
        <div>{pageNumber}</div>
    </>
}
