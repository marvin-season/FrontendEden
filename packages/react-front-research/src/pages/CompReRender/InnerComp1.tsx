import React, {useEffect} from "react";

export const InnerComp1: React.FC<{ value?:any }> = props => {
    useEffect(() => {
        console.log('mounted InnerComp1')
    }, []);

    useEffect(() => {
        console.log('update InnerComp1', props.value)
    }, [props.value]);
    return (
        <>

        </>
    );
};
