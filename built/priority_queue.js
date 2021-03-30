"use strict";
// By Sumit Ghosh at https://www.geeksforgeeks.org/implementation-priority-queue-javascript/
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
var QElement = /** @class */ (function () {
    function QElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }
    return QElement;
}());
// PriorityQueue class
// Highest priority is at the end of the array
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
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
    PriorityQueue.prototype.enqueue = function (element, priority) {
        if (priority === void 0) { priority = 0; }
        var qElement = new QElement(element, priority);
        var contain = false;
        for (var i = 0; i < this.items.length; i++) {
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
    };
    PriorityQueue.prototype.removeHighest = function () {
        if (this.isEmpty())
            throw Error('Queue is empty');
        return this.items.pop().element;
    };
    PriorityQueue.prototype.removeLowest = function () {
        if (this.isEmpty())
            throw Error('Queue is empty');
        return this.items.shift().element;
    };
    PriorityQueue.prototype.peekLowest = function () {
        if (this.isEmpty())
            return null;
        return this.items[0].element;
    };
    PriorityQueue.prototype.peekHighest = function () {
        if (this.isEmpty())
            return null;
        return this.items[this.items.length - 1].element;
    };
    PriorityQueue.prototype.isIn = function (element) {
        this.items.forEach(function (qElem) {
            if (qElem.element == element) {
                return true;
            }
        });
        return false;
    };
    // isEmpty function
    PriorityQueue.prototype.isEmpty = function () {
        // return true if the queue is empty.
        return this.items.length == 0;
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
