import {Node} from 'reactflow';


export const baseNodes: Node[] = [
    {id: 'node-1', type: 'customNode', position: {x: 0, y: 200}, data: {label: 'node1'}},
    {
        id: 'node-2',
        type: 'customNode',
        position: {x: 100, y: 0},
        data: {label: 'node2'},
    },
    {
        id: 'node-3',
        type: 'output',
        position: {x: 200, y: 200},
        data: {label: 'node3'},
    },
];
