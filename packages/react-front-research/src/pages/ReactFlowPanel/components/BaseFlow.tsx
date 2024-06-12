import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Background} from 'reactflow';
import 'reactflow/dist/style.css';
import React, {useMemo, useState} from "react";
import {baseNodes} from "@/pages/ReactFlowPanel/nodes";
import {baseEdges} from "@/pages/ReactFlowPanel/edges";
import CustomNode from "@/pages/ReactFlowPanel/components/CustomNode.tsx";

const rfStyle = {
    backgroundColor: '#B8CEFF',
};
export default function () {
    const [nodes, setNodes] = useState(baseNodes);
    const [edges, setEdges] = useState(baseEdges);
    const nodeTypes = useMemo(() => ({customNode: CustomNode}), []);

    return <div style={{height: '600px'}}>
        <ReactFlow nodeTypes={nodeTypes}
                   nodes={nodes}
                   edges={edges}
                   onNodesChange={changes => setNodes(prevState => applyNodeChanges(changes, prevState))}
                   onEdgesChange={changes => setEdges(prevState => applyEdgeChanges(changes, prevState))}
                   onConnect={connection => {
                       const edge = {...connection, type: 'custom-edge'};
                       setEdges((eds) => addEdge(edge, eds));
                   }}
                   fitView
                   style={rfStyle}>
            <Background/>
            {/*<Controls/>*/}
        </ReactFlow>
    </div>
}
