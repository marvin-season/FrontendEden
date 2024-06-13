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

export const graph = {
    "nodes": [
        {
            "id": "1717405301069",
            "type": "custom",
            "data": {
                "type": "start",
                "title": "开始",
                "desc": "",
                "variables": [],
                "selected": false
            },
            "position": {
                "x": 143,
                "y": 224
            },
            "targetPosition": "left",
            "sourcePosition": "right",
            "positionAbsolute": {
                "x": 143,
                "y": 224
            },
            "width": 244,
            "height": 54,
            "selected": false
        },
        {
            "id": "1718194703822",
            "type": "custom",
            "data": {
                "type": "llm",
                "title": "LLM",
                "desc": "",
                "variables": [],
                "model": {
                    "provider": "openai",
                    "name": "gpt-3.5-turbo",
                    "mode": "chat",
                    "completion_params": {
                        "temperature": 0.7
                    }
                },
                "prompt_template": [
                    {
                        "role": "system",
                        "text": "",
                        "id": "955b31a9-7d0f-4c1d-812f-73475509456d"
                    }
                ],
                "context": {
                    "enabled": false,
                    "variable_selector": []
                },
                "vision": {
                    "enabled": false
                },
                "selected": true
            },
            "position": {
                "x": 459,
                "y": 149
            },
            "targetPosition": "left",
            "sourcePosition": "right",
            "positionAbsolute": {
                "x": 459,
                "y": 149
            },
            "width": 244,
            "height": 98,
            "selected": true
        }
    ],
    "edges": [
        {
            "id": "1717405301069-source-1718194703822-target",
            "type": "custom",
            "source": "1717405301069",
            "sourceHandle": "source",
            "target": "1718194703822",
            "targetHandle": "target",
            "data": {
                "sourceType": "start",
                "targetType": "llm",
                "isInIteration": false
            },
            "zIndex": 0
        }
    ],
    "viewport": {
        "x": 0,
        "y": 0,
        "zoom": 1
    }
}
