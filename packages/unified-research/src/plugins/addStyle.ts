// 插件添加样式标签
export function addStyles() {
    return (tree) => {
        tree.children.unshift({
            type: 'element',
            tagName: 'style',
            properties: {},
            children: [{
                type: 'text',
                value: `
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
        `
            }]
        })
    }
}
