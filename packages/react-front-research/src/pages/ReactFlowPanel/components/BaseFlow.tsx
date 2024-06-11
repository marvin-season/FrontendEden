import ReactFlow, {Background, Controls} from 'reactflow';
import 'reactflow/dist/style.css';
import React from "react";
import {baseNodes} from "@/pages/ReactFlowPanel/nodes";

export default function () {
    return <div style={{height: '400px'}}>
        <ReactFlow nodes={baseNodes}>
            <Background/>
            <Controls/>
        </ReactFlow>
    </div>
}
