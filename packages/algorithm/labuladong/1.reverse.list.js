import {createLinkedList} from "../utils/index.js"

const linkedList = createLinkedList();
console.log("🚀  ", linkedList)


export const reverseLinkList = (head) => {
    if (!head.next) {
        return head
    }

    const last = reverseLinkList(head.next)
    head.next.next = head;
    head.next = null;
    return last
}
const r = reverseLinkList(linkedList);
console.log("🚀  ", r)
