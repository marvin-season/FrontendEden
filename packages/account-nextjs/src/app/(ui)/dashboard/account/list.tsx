"use client";
import { useAccountList } from "@/app/_hooks/api/account";

export const List = () => {
    const {data} = useAccountList()
    return <>
        {data.map((item) => {
            return <div className="text-color-500" key={item.id}>{item.name}</div>
        })}
    </>
}