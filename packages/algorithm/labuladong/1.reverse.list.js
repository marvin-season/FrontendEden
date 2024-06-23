/**
 * @description 递归思维：反转链表
 *
 *  拆解为子问题，找到base case
 */

import {createLinkedList, linkedListLoggers} from "../utils/index.js"

const linkedList = createLinkedList([1, 2, 3, 4, 5, 6]);
console.log("🚀  ", linkedList)

/**
 * 反转整个链表
 */
export const reverseLinkList = (head) => {
    if (!head.next) {
        return head
    }
    const last = reverseLinkList(head.next)
    head.next.next = head;
    head.next = null;
    return last
}
/**
 * 反转链表前N个节点
 */
let successor = null;
export const reverseLinkListN = (head, n) => {
    // base case: 反转前1个节点
    if (n === 1) {
        successor = head.next;
        return head
    }

    const last = reverseLinkListN(head.next, n - 1);
    head.next.next = head;
    head.next = successor;
    return last
}

/**
 * 反转链表的一部分
 */
export const reverseLinkListBetween = (head, m, n) => {
    // base case：m = 1
    if (m === 1) {
        return reverseLinkListN(head, n)
    }

    head.next = reverseLinkListBetween(head.next, m - 1, n - 1)
    return head
}

linkedListLoggers(reverseLinkListBetween(linkedList, 2, 4))
