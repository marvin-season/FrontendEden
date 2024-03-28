import React, {ComponentType, CSSProperties, FunctionComponent} from "react";
import {Flex} from "@/styled";

export const withContainerStyle = <P extends object>(Component: ComponentType<P>, style: CSSProperties) => {
    return (props: P) => {
        return <Flex style={style}>
            <Component style={{justifyContent: 'flex-start',}} {...props}></Component>
        </Flex>
    }
}

export const connect = <P extends object>(Component: FunctionComponent<P>, props: P) => {
    return (pp: Partial<P>) => <Component {...props} {...pp}/>
}
