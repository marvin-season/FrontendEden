import {ChatProps, renderAnswerPanelType, renderQuestionPanelType, TreeChatItem} from "@/components/chat/types.ts";
import React, {ReactElement, useEffect, useState} from "react";
import {Flex} from "@/styled";

function convertToTree(chatList: TreeChatItem[], root: TreeChatItem): TreeChatItem {

    const children: TreeChatItem[] = []
    chatList.forEach(item => {
        if (item.parentId == root.id) {
            const treeRoot = convertToTree(chatList, item);
            if (treeRoot) {
                children.push(treeRoot);
                treeRoot.parent = root
            }
        }
    })

    root.children = children;
    return root
}

function getRoots(chatList: TreeChatItem[]) {
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

export function TreeAnswerPanel({chatItem}: { chatItem: TreeChatItem }) {
    const show = chatItem.parent?.childrenShow

    return (<>
        {
            show && <Flex onClick={() => {

            }} style={{
                cursor: 'pointer',
                background: 'lightblue'
            }}>
                <Flex>
                    答：
                </Flex>
                <Flex>
                    {chatItem.content}
                </Flex>

            </Flex>
        }
    </>);
}

export function TreeQuestionPanel({chatItem, onShow}: {
    chatItem: TreeChatItem;
    onShow: (chatItem: TreeChatItem) => void
}) {
    const show = () => {
        // 判读是否显示
        if (!chatItem.parent) {
            return true
        }
        let parent = chatItem.parent;
        while (parent.parent) {
            parent = parent.parent
        }
        return parent.childrenShow
    }
    return <>
        {
            show() && <Flex
                onClick={() => {
                    onShow(chatItem)
                }}
                style={{
                    cursor: 'pointer',
                    background: 'lightcyan'
                }}>
                <Flex>
                    问：
                </Flex>
                <Flex>
                    {chatItem.content}
                </Flex>
            </Flex>
        }
    </>;
}
