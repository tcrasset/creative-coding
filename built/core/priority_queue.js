"use strict";
// By Sumit Ghosh at https://www.geeksforgeeks.org/implementation-priority-queue-javascript/
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
// PriorityQueue class
// Highest priority is at the end of the array
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    /**
     *
     * @param  element
     * @param  priority Priority of the element. Defaults to 0, thus works as:
     *                    - a LIFO queue if removeLowest() is used,
     *                    - a FIFO queue if removeHighest() is used,
     *
     */
    enqueue(element, priority = 0) {
        const qElement = new QElement(element, priority);
        let contain = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority >= qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
    }
    removeHighest() {
        if (this.isEmpty())
            throw Error('Queue is empty');
        return this.items.pop().element;
    }
    removeLowest() {
        if (this.isEmpty())
            throw Error('Queue is empty');
        return this.items.shift().element;
    }
    peekLowest() {
        if (this.isEmpty())
            return null;
        return this.items[0].element;
    }
    peekHighest() {
        if (this.isEmpty())
            return null;
        return this.items[this.items.length - 1].element;
    }
    isIn(element) {
        this.items.forEach((qElem) => {
            if (qElem.element == element) {
                return true;
            }
        });
        return false;
    }
    // isEmpty function
    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }
}
exports.PriorityQueue = PriorityQueue;
