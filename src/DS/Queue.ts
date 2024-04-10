class Queue<T> {
    private elements: { [key: number]: T };
    private head: number;
    private tail: number;

    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }

    enqueue(element: T): void {
        this.elements[this.tail] = element;
        this.tail++;
    }

    dequeue(): T | undefined {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }

    peek(): T | undefined {
        return this.elements[this.head];
    }

    get length(): number {
        return this.tail - this.head;
    }

    get isEmpty(): boolean {
        return this.length === 0;
    }
}

class Node {
    constructor(
        public x: number,
        public y: number
    ) {}
}

export { Node, Queue };
