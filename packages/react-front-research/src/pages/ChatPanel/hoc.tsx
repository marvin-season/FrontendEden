import React, {ComponentType, CSSProperties} from "react";
import {Flex} from "@/styled";

export const withContainerStyle = <P extends object>(Component: ComponentType<P>, style: CSSProperties) => {
    return (props: P) => {
        return <Flex style={style}>
            <Component style={{justifyContent: 'flex-start',}} {...props}></Component>
        </Flex>
    }
}
