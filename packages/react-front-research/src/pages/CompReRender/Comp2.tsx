import React, {FC, useEffect, useState} from "react";

export const Comp2: FC<{}> = () => {
    const [showComp2, setShowComp2] = useState(false)

    useEffect(() => {
        console.log('showComp2', showComp2)
    }, [showComp2]);
    return (
        <>
            <div>comp2</div>
            <button onClick={() => {
                setShowComp2(!showComp2)
            }}>toggle2
            </button>
        </>
    );
};
