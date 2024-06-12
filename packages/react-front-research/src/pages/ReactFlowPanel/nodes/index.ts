import {Node} from 'reactflow';


export const baseNodes: Node[] = [
    {id: 'node-1', type: 'customNode', position: {x: 0, y: 0}, data: {value: 123}},
    {
        id: 'node-2',
        type: 'output',
        // targetPosition: 'top',
        position: {x: 0, y: 200},
        data: {label: 'node 2'},
    },
    {
        id: 'node-3',
        type: 'output',
        // targetPosition: 'top',
        position: {x: 200, y: 200},
        data: {label: 'node 3'},
    },
];
