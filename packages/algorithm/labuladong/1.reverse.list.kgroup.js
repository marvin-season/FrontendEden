/**
 * 迭代法 反转链表
 */

import {createLinkedList, linkedListLoggers} from "../utils/index.js"

const linkedList = createLinkedList([1, 2, 3, 4, 5, 6]);
linkedListLoggers(linkedList);

export const reverseLinkList = (head) => {
    let pre = null;
    let current = head;
    while (current) {
        const next = current.next;
        current.next = pre;
        pre = current;
        current = next;
    }
    return pre
}

linkedListLoggers(reverseLinkList(linkedList))
