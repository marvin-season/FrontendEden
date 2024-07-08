"use client";
import { useEffect } from "react"

export const List = () => {
    useEffect(() => {
        fetch('/api/account/list')
    }, [])
    return <>
        list
    </>
}