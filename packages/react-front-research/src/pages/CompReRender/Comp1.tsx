import React, {FC, useEffect, useState} from "react";
import {InnerComp1} from "@/pages/CompReRender/InnerComp1.tsx";

export const Comp1: FC<{}> = ({}) => {
    const [showComp1, setShowComp1] = useState(false)
    useEffect(() => {
        console.log('mounted Comp1')
    }, []);

    useEffect(() => {
        console.log('update Comp1', showComp1)
    }, [showComp1]);
    return (
        <>
            <div>
                comp1
            </div>
            <InnerComp1 value={showComp1}/>
            <button onClick={() => {
                setShowComp1(!showComp1)
            }}>toggle1
            </button>
        </>
    );
};
