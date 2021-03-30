// By Sumit Ghosh at https://www.geeksforgeeks.org/implementation-priority-queue-javascript/

class QElement {
  element: never;
  priority: number;
  constructor(element : never, priority : number) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class

// Highest priority is at the end of the array
export class PriorityQueue {
  items: QElement[];
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
  enqueue(element : never, priority = 0) : void {
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

  removeHighest() : never {
    if (this.isEmpty()) throw Error('Queue is empty');
    return (this.items.pop() as QElement).element;
  }

  removeLowest() : never {
    if (this.isEmpty()) throw Error('Queue is empty');
    return (this.items.shift() as QElement).element;
  }

  peekLowest() : never | null {
    if (this.isEmpty()) return null;
    return this.items[0].element;
  }

  peekHighest() : never | null{
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1].element;
  }

  isIn(element : never) : boolean {
    this.items.forEach((qElem) => {
      if (qElem.element == element) {
        return true;
      }
    });
    return false;
  }

  // isEmpty function
  isEmpty() : boolean {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
}
