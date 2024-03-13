import {
    ChatItem,
    ChatProps,
    renderAnswerPanelType,
    renderQuestionPanelType,
    TreeChatItem
} from "@/components/chat/types.ts";
import {ReactElement, useEffect, useState} from "react";

function convertToTree(chatList: ChatItem[], id: string): TreeChatItem | undefined {
    const findIndex = chatList.findIndex(item => item.id == id);
    if (findIndex < 0) {
        return undefined
    }
    const root = chatList[findIndex] as TreeChatItem;

    const children: TreeChatItem[] = []
    chatList.forEach(item => {
        if (item.parentId == id) {
            const root = convertToTree(chatList, item.id);
            if (root) children.push(root)
        }
    })

    root.children = children;
    return root
}

export const treeLayoutRender: ChatProps['renderChatItemLayout'] = (chatList, renderAnswerPanel, renderQuestionPanel) => {

    const [root, setRoot] = useState<TreeChatItem>();
    const [currentNode, setCurrentNode] = useState<TreeChatItem>();

    useEffect(() => {
        setRoot(convertToTree(chatList, chatList[0].id));
        setCurrentNode(root);
    }, []);

    return <>
        {
            root && renderTree(root, renderAnswerPanel, renderQuestionPanel)
        }
    </>
}

function renderTree(root: TreeChatItem, renderAnswerPanel?: renderAnswerPanelType, renderQuestionPane?: renderQuestionPanelType): ReactElement {
    console.log(root)
    if (!root.children || root.children.length <= 0) {
        return <>
            {
                root.role == "answer" ? renderAnswerPanel?.(root) : renderQuestionPane?.(root)
            }
        </>

    }

    return <>
        {
            root.role == "answer" ? renderAnswerPanel?.(root) : renderQuestionPane?.(root)
        }
        {
            root.children.map(item => {
                return renderTree(item, renderAnswerPanel, renderQuestionPane)
            })
        }
    </>
}
