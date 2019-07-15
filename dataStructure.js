// 钱币分割，每三位数加，
// 第一种
function addDot(num) {
    var data = parseInt(num).toString();
    var arr = [];
    while(data.length > 2) {
        arr.push(data.slice(-3));
        data = data.slice(0, -3);
        if (data.length > 0 && data.length < 3) {
            arr.push(data);
        }
    }
    return arr.reverse().join(',');
}
// 第二种
function addDot(num) {
    var data = parseInt(num).toString();
    data = data.split('').reverse().join('');
    data = data.replace(/([0-9]{3})/g, '$1,').split('').reverse().join();
    return data;
}
console.log(addDot(1232321332));

// 插入大量dom节点的分批处理
setTimeout(function() {
    var total = 100000;
    var limit = 100;
    var count = Math.ceil(total / limit);
    var currCount = 0;

    function insertData() {
        var fragment = document.createDocumentFragment();

        for (var i = currCount * limit; i < (currCount + 1) * limit; i++) {
            var liEl = document.createElement('li');
            liEl.innerText = i;
            fragment.appendChild(liEl);
        }

        document.getElementById('dataUl').appendChild(fragment);
        currCount++;
        loop();
    }

    function loop() {
        if (currCount < count) {
            requestAnimationFrame(insertData);
        }
    }

    loop();
}, 0);

// 栈
class Stack {
    constructor() {
        this.stack = [];
    }
    push(item) {
        this.stack.push(item);
    }
    pop() {
        return this.stack.pop();
    }
    peek() {
        return this.stack[this.getCount() -1];
    }
    getCount() {
        return this.stack.length;
    }
    isEmpty() {
        return this.getCount() === 0;
    }
}

// 括号匹配
let isValid = function(str) {
    let map = {
        '(': -1,
        ')': 1,
        '[': -2,
        ']': 2,
        '{': -3,
        '}': 3
    };
    let stack = [];

    for (let i = 0; i < str.length; i++) {
        if (map[str[i]] < 0) {
            stack.push(str[i]);
        } else {
            let last = stack.pop();
            if (map[last] + map[str[i]] !== 0) return false;
        }
    }
    
    if (stack.length > 0) return false;
    return true;
}

// 队列
class Queue {
    constructor() {
        this.queue = [];
    }
    enQueue(item) {
        this.queue.push(item);
    }
    deQueue() {
        return this.queue.shift();
    }
    getHeader() {
        return this.queue[0];
    }
    getLength() {
        return this.queue.length;
    }
    isEmpty() {
        return this.getLength === 0;
    }
}

// 优先队列
class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    enQueue(item, priority) {
        let queObj = {
            el: item,
            priority: priority
        };
        if (this.isEmpty()) {
            this.queue.push(queObj);
        } else {
            let inserted = false;
            for (let i = 0, len = this.queue.length; i < len; i++) {
                if (this.queue[i].priority < priority) {
                    this.queue.splice(i, 0, queObj);
                    inserted = true;
                    break;
                } 
            }
            if (!inserted) {
                this.queue.push(queObj);
            }
        }
    }
    deQueue() {
        return this.queue.shift();
    } 
    getHeader() {
        return this.queue[0];
    }
    getLength() {
        return this.queue.length;
    }
    isEmpty() {
        return this.getLength === 0;
    }
    print() {
        let arr = [];
        this.queue.forEach(item => {
            arr.push(item.el);
        });
        console.log(arr.toString());
    }
}

// 击鼓传花
function hotPotato(list, num) {
    let queue = new Queue();
    for (let i = 0, len = list.length; i < len; i++) {
        queue.enQueue(list[i]);
    }

    while(queue.getLength() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enQueue(queue.deQueue());
        }

        console.log(queue.deQueue() + '被淘汰了');
    }

    return queue.deQueue();
}

// 循环队列
class CircleQueue {
    
    constructor(size) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.queue = new Array(size + 1);
    }

    enQueue(item) {
        // 判断队尾 + 1 是否为队头
        // 如果是就代表需要扩容数组
        // % this.queue.length 是为了防止数组越界
        if (this.head === (this.last + 1) % this.queue.length) {
            this.resize(getLength() * 2 + 1);
        }
        this.queue[this.last] = item;
        this.size++;
        this.last = (this.last + 1) % this.queue.length;
    }

    deQueue(item) {
        if (this.isEmpty) {
            throw Error('Queue is empty');
        }
        let data = this.queue(this.head);
        this.queue[this.head] = null;
        this.head = (this.head + 1) % this.queue.length;
        this.size--;
        // 判断当前队列大小是否过小
        // 为了保证不浪费空间，在队列空间等于总长度四分之一时
        // 且不为 2 时缩小总长度为当前的一半
        if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
            this.resize(this.getLength() / 2);
        }
    }

    clear() {
        this.queue = new Array(this.size + 1);
        this.head = 0;
        this.tail = 0;
    }

    getHeader() {
        if (this.isEmpty) {
            throw Error('Queue is empty');
        }
        return this.queue[this.head];
    }

    getLength() {
        return this.queue.length - 1;
    }

    isEmpty() {
        return this.head === this.tail;
    }

    resize(len) {
        let arr = new Array(len);
        for (let i = 0; i < len; i++) {
            arr[i] = this.queue[(this.head + i) % this.queue.length]
        }
        this.head = 0;
        this.tail = this.size;
        this.queue = arr;
    }
}

// 链表
class Node {
    constructor(el) {
        this.el = el;
        this.next = null;
    }
}

class LinkList {
    constructor() {
        this.size = 0;
        this.head = new Node(null);
    }

    find(item) {
        let currNode = this.head;
        while(currNode.el !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    findPrev(item) {
        let currNode = this.head;
        while(currNode.next !== null && currNode.next.el !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    insert(newEl, item) {
        let newNode = new Node(newEl);
        let currNode = this.find(item);
        newNode.next = currNode.next;
        currNode.next = newNode;
    }

    remove(item) {
        let pevNode = this.findPrev(item);
        if (pevNode.next !== null) {
            pevNode.next = pevNode.next.next;
        }
    }

    display() {
        let currNode = this.head;
        while(currNode.next !== null) {
            console.log(currNode.next);
            currNode = currNode.next;
        }
    }
}

// 双向链表
class Node {
    constructor(el) {
        this.el = el;
        this.next = null;
        this.previous = null;
    }
}

class LinkList {
    constructor() {
        this.size = 0;
        this.head = new Node(null);
    }

    find(item) {
        let currNode = this.head;
        while(currNode.el !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    findLast() {
        let currNode = this.head;
        while(currNode.next !== null) {
            currNode = currNode.next;
        }
        return currNode;
    }

    insert(newEl, item) {
        let newNode = new Node(newEl);
        let currNode = this.find(item);
        newNode.next = currNode.next;
        newNode.previous = currNode;
        currNode.next = newNode;
    }

    remove(item) {
        let currNode = this.find(item);
        if (currNode.next !== null) {
            currNode.previous.next = currNode.next;
            currNode.next.previous = currNode.previous;
            currNode.previous = null;
            currNode.next = null;
        }
    }

    display() {
        let currNode = this.head;
        while(currNode.next !== null) {
            console.log(currNode.next);
            currNode = currNode.next;
        }
    }

    displayReverse() {
        let currNode = this.findLast();
        while(currNode.previous !== null) {
            console.log(currNode);
            currNode = currNode.previous;
        }
    }
}

// 集合
class Set {
    constructor() {
        this.items = {};
    }

    add(val) {
        if (this.has(val)) return false;
        this.items[val] = val;
        return true;
    }

    delete() {
        if (this.has(val)) {
            delete this.items[val];
            return true;
        }   
        return false;
    }

    has(val) {
        return this.items.hasOwnPropertity(val);
    }

    get size() {
        return Object.keys(this.items).length;
    }

    get values() {
        return Object.keys(this.items);
    }
}

// 字典
class Dictionary {
    constructor() {
        this.items = {};
    }

    add(val) {
        if (this.has(val)) return false;
        this.items[val] = val;
        return true;
    }

    delete() {
        if (this.has(val)) {
            delete this.items[val];
            return true;
        }   
        return false;
    }

    clear() {
        this.items = {};
    }

    has(val) {
        return this.items.hasOwnPropertity(val);
    }

    get size() {
        return Object.keys(this.items).length;
    }

    get keys() {
        return Object.keys(this.items);
    }

    get values() {
        return Object.values(this.items);
    }
}


// 散列表
class HashTable {
    contructor() {
        this.table = [];
    }

    static loseloseHashCode(key) {
        let hash = 0;
        for (let codePoint of key) {
            hash += codePoint.charCodeAt();
        }
        return hash % 37;
    }

    put(key, value) {
        const position = HashTable.loseloseHashCode(key)
        console.log(`${position} - ${key}`)
        this.table[position] = value
    }

    get(key) {
        return this.table[HashTable.loseloseHashCode(key)]
    }

    remove(key) {
        this.table[HashTable.loseloseHashCode(key)] = undefined
    }
}

// 字典，Object就是字典在javascript中的实现
// 字典与哈希表区别（哈希表是字典的一种形式）
// 1，单线程里面用字典，多线程里面用哈希表。
// 2，字典的排序就是按照插入的顺序来的，而哈希表未必是。
// 3，哈希表允许单线程写入，多线程读取。
// 4，哈希表最大的优势在于其索引方式，它是经过散列处理过的，在数据量大的时候尤其如此。

// 二叉搜索树
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(val) {
        let newNode = new Node(val);
        let insertNode = function(node, newNode) {
            if (node.key > newNode.key) {
                if (!node.left) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (!node.right) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode);
                }
            }
        }

        if (this.root) {
            insertNode(this.root, newNode);
        } else {
            this.root = newNode;
        }
    }

    inOrderTraverse(callback) {
        let inOrderTraverseNode = function(node) {
            if (node) {
                inOrderTraverseNode(node.left);
                callback(node.key);
                inOrderTraverseNode(node.right);
            }
        }
        inOrderTraverseNode(this.root);
    }

    preOrderTraverse(callback) {
        let preOrderTraverseNode = function(node) {
            if (node) {
                callback(node.key);
                preOrderTraverseNode(node.left);
                preOrderTraverseNode(node.right);
            }
        }
        preOrderTraverseNode(this.root);
    }

    backOrderTraverse(callback) {
        let backOrderTraverseNode = function(node) {
            if (node) {
                backOrderTraverseNode(node.left);
                backOrderTraverseNode(node.right);
                callback(node.key);
            }
        }
        backOrderTraverseNode(this.root);
    }

    min(node) {
        let minNode = (node) => {
            return node ? (!node.left ? node : minNode(node.left)) : null;
        }

        return minNode(node || this.root);
    }

    max(node) {
        let maxNode = (node) => {
            return node ? (!node.right ? node : maxNode(node.right)) : null; 
        }

        return maxNode(node || this.root);
    }

    search(key) {
        let searchNode = (node, key) => {
            if (node === null) return false;
            if (node.key === key) return node;

            return searchNode(node.key < key ? node.left : node.right, key);
        }

        return searchNode(this.root, key);
    }
} 

// 图
class Graph {
    constructor() {
        this.vertices = [];
        this.list = {};
    }

    addVertex(v) {
        this.vertices.push(v);
        this.list[v] = [];
    }

    addEdge(pre, next) {
        this.list[pre].push(next);
        this.list[next].push(pre);
    }

    toString() {
        return this.vertices.reduce((pre, curr) => {
            return this.list[curr].reduce((pre, curr) => {
                return `${pre} ${curr}`;
            }, `${pre}\n${curr} => `)        
        }, 'Graph')
    }

    // breadth first search
    bfs(vertex, callback) {
        let read = [];
        let list = this.list;
        let pending = [vertex || this.vertices[0]];
        let readVertices = (vertices) => {
            vertices.forEach((v) => {
                read.push(v);
                pending.shift();
                list[v].forEach((key) => {
                    if (!pending.includes(key) && !read.includes(key)) {
                        this.pending.push(key);
                    }
                });
                callback && callback(v);

                if (pending.length) readVertices(pending);
            })
        }

        readVertices(pending);
    }

    // depth first search
    dfs(callback) {
        let read = [];
        let list = this.list;
        let readVerticles = (vertices) => {
            vertices.forEach((v) => {
                if (read.includes(v)) return false;
                
                read.push(v);
                callback && callback(v);
                if (read.length !== this.vertices.length) {
                    readVerticles(list[v]);
                }
            })
        }
        readVerticles(Object.keys(list));
    }
}

// 动态规划
// 硬币找零,求最少硬币数量
class MinCoinChange {
    constructor(coins) {
        this.coins = coins.sort((a, b) => a - b);
    }

    makeChange(account) {
        let coins = this.coins;
        let arr = new Array(coins.length + 1);

        for (let i = 0; i <= coins.length; i++) {
            arr[i] = new Array(account + 1);
            arr[i][0] = 0;
        }
        for (let i = 0; i <= account; i++) {
            arr[0][i] = Number.MAX_VALUE;
        }

        for (let j = 1; j <= account; j++) {
            for (let i = 1; i <= coins.length; i++) {
                if (j < coins[i - 1]) {
                    arr[i][j] = arr[i - 1][j];
                    continue;
                }

                if (arr[i - 1][j] < arr[i][j - coins[i - 1]] + 1) {
                    arr[i][j] = arr[i - 1][j];
                } else {
                    arr[i][j] = arr[i][j - coins[i - 1]] + 1;
                }
            }
        }
        console.log(arr);
        return arr[coins.length][account];
    }
}
// 硬币找零,求数量最少时的硬币组合
class MinCoinChange {
    constructor(coins) {
        this.coins = coins;
        this.cache = {};
    }

    makeChange(account) {
        if (!account) return [];
        if (this.cache[account]) return this.cache[account];

        let min = [],
            newMin,
            newAccount;
        this.coins.forEach((coin) => {
            newAccount = account - coin;
            if (newAccount >= 0) {
                newMin = this.makeChange(newAccount);

                if (newMin.length + 1 < min.length || !min.length) {
                    min = [coin].concat(newMin); 
                }
            }
        })
        
        return (this.cache[account] = min);
    }
}

// 从长度为n的数组中选取m个数，求和为s的组合
// 递归算法
var findArr = function(nArr, m, s) {
    var obj = {};
    var result = [];
	var findSArr = function(nArr, sArr, m, s) {
		if (m <= 0 || s <= 0) return;
			
		for (var i = 0, len = nArr.length; i < len; i++) {
			if (nArr[i] === s && m - 1 === 0) {
                sArr = sArr.concat(s).sort();
				!obj[sArr] && (obj[sArr] = true);
				return;	
			} 
         	if (s > nArr[i]) {
				var tempArr = nArr.slice(0);
				tempArr.splice(i, 1);
				findSArr(tempArr, sArr.concat(nArr[i]), m - 1, s - nArr[i]);
			}
		}
	}

    findSArr(nArr, [], m, s);
    for (var key in obj) {
        result.push(key.split(','));
    }
	return result;
}

// 0-1算法
var findArr = function(nArr, m, s) {
    var n = function(i) {
		var count = 0;

		while(i) {
			if (1 & i) {
				count++;
			}
			i >>= 1;
		}
		return count;
    },
    result = [],
    obj = {};
        
    for (var i = 0, len = nArr.length; i < Math.pow(2, len); i++) {
        if (n(i) === m) {
            var tempSum = 0,
                tempArr = [];
            for (var j = 0; j < len; j++) {
                if (i & 1 << (len - j - 1)) {
                    tempSum += nArr[j];
                    tempArr.push(nArr[j]);
                }
            }
            tempArr.sort();
            if (tempSum === s && !obj[tempArr]) {
                result.push(tempArr);
                obj[tempArr] = true;
            }
        }
    }
    return result;
}

// 贪心算法
class MinCoinChange {
    
    constructor(coins) {
        this.coins = coins;
    }

    makeChange(account) {
        let change = [];

        this.coins.sort((a, b) => b - a).forEach((coin) => {
            while(account - coin >= 0) {
                change.push(coin);
                account -= coin;
            }
        })

        return change;
    }
}

// 数独判断
var isValidSudoku = function(board) {
    var columns = [];
    var blocks = [];

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!columns[j]) {
                columns[j] = [];
            }
            columns[j % board[i].length].push(board[i][j]);

            var blockIndex = Math.floor(j / 3) + Math.floor(i / 3) * 3;
            if (!blocks[blockIndex]) {
                blocks[blockIndex] = [];
            } 
            blocks[blockIndex].push(board[i][j]);
        }
    }

    
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] !== '.') {
                var data = board[i][j];
                var blockResult = blocks[Math.floor(j / 3) + Math.floor(i / 3) * 3].indexOf(data, j % 3 + i % 3 * 3);
                var columnResult = columns[j % board[i].length].indexOf(data, i);
                var rowResult = board[i].indexOf(data, j);
                if (blockResult !== -1 || columnResult !== -1 || rowResult !== -1) {
                    return false;
                }
            }
        }
    }
    return true;
};