import {Handle, Position} from "reactflow";

const CustomNode = () => {

    return (
        <>
            <Handle type="target" position={Position.Top}/>
            <div style={{background: '#fff'}}>
                custom
            </div>
            <Handle type="source" position={Position.Bottom} id="a"/>
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={{left: 0}}
            />
        </>
    );
}

export default CustomNode
