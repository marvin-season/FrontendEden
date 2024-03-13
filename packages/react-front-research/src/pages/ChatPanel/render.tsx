import {
    ChatItem,
    ChatProps,
    renderAnswerPanelType,
    renderQuestionPanelType,
    TreeChatItem
} from "@/components/chat/types.ts";
import {ReactElement, useEffect, useState} from "react";

function convertToTree(chatList: ChatItem[], root: TreeChatItem): TreeChatItem {

    const children: TreeChatItem[] = []
    chatList.forEach(item => {
        if (item.parentId == root.id) {
            const root = convertToTree(chatList, item);
            if (root) children.push(root)
        }
    })

    root.children = children;
    return root
}

function getRoots(chatList: ChatItem[]) {
    return chatList.filter(item => !item.parentId);
}

export const treeLayoutRender: ChatProps['renderChatItemLayout'] = (chatList, renderAnswerPanel, renderQuestionPanel) => {

    const [roots, setRoots] = useState<TreeChatItem[]>([]);

    useEffect(() => {
        const roots = getRoots(chatList).map(root => {
            return convertToTree(chatList, root);
        })
        console.log(roots)
        roots && setRoots(roots);
    }, []);

    return <>
        {
            roots.length > 0 && roots.map(root => renderTree(root, renderAnswerPanel, renderQuestionPanel))
        }
    </>
}

function renderTree(root: TreeChatItem, renderAnswerPanel?: renderAnswerPanelType, renderQuestionPane?: renderQuestionPanelType): ReactElement {


    if (!root.children || root.children.length == 0) {
        return <div>
            {
                root.role == "answer" ? renderAnswerPanel?.(root) : renderQuestionPane?.(root)
            }
        </div>

    }

    return <>
        <div style={{paddingBottom: '20px'}}>
            {
                root.role == "answer" ? renderAnswerPanel?.(root) : renderQuestionPane?.(root)
            }
        </div>
        {
            root.children.map(item => {
                return <div key={item.id}>
                    {
                        renderTree(item, renderAnswerPanel, renderQuestionPane)
                    }
                </div>
            })
        }
    </>
}
