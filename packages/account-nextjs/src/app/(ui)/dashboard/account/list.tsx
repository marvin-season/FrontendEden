"use client";

import { getAccountList } from "@/app/_service/account";
import { useEffect, useState } from "react";

export const List = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAccountList().then(setData)
    }, [])

    // 一个表格，类似antd的样式
    return <div className="border-2 rounded-lg p-4">
        {data.map((item: any) => {
            return <div className="text-base" key={item.id}>{item.name}</div>
        })}
    </div>
}
