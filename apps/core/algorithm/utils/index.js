export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export const createLinkedList = (array = [1, 2, 3]) => {
    const head = new Node(array[0]);
    let current = head;
    for (let i = 1; i < array.length; i++) {
        current.next = new Node(array[i]);
        current = current.next;
    }
    return head;
}

export const linkedListLoggers = (head) => {
    let current = head;
    let r = ''
    while (current) {
        r += current.value + ' -> '
        current = current.next
    }
    console.log("🚀  ", r + 'null')
}
