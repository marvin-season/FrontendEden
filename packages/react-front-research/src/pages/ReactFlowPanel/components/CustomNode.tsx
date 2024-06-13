import {Handle, NodeProps, Position} from "reactflow";
import {FC} from "react";

const CustomNode: FC<NodeProps> = (props) => {
    console.log("🚀  ", props)
    return (
        <>
            <div style={{background: '#fff'}}>
                {props.data.title}
            </div>
            <Handle type="source"  position={Position.Bottom} id="source"/>
            <Handle
                type="target"
                position={Position.Bottom}
                id="target"
                style={{left: 0}}
            />
        </>
    );
}

export default CustomNode
