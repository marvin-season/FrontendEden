import {Handle, NodeProps, Position} from "reactflow";
import {FC} from "react";

const CustomNode: FC<NodeProps> = ({data}) => {
    return (
        <>
            <Handle type="target" position={Position.Top}/>
            <div style={{background: '#fff'}}>
                {data.label}
            </div>
            <Handle type="source" position={Position.Bottom} id="a"/>
            <Handle
                type="target"
                position={Position.Bottom}
                id="b"
                style={{left: 0}}
            />
        </>
    );
}

export default CustomNode
