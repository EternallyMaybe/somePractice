// call实现
Function.prototype.myApply = function(content) {
    var ctx = content || window;
	ctx.fn = this;
    var args = [...arguments].slice(1);
    var result = ctx.fn(...args);

    delete ctx.fn;
    return result;
}

// apply实现
Function.prototype.myCall = function(content) {
    var ctx = content || window;
    var result;

    ctx.fn = this;
    if (arguments[1]) {
        result = ctx.fn(...arguments[1]);
    } else {
        result = ctx.fn();
    }
    delete ctx.fn;

    return result;
}

// bind模拟
Function.prototype.myBind = function(content) {
    var ctx = content || window,
        self = this,
        args = [...arguments].slice(1);   

    return function fn() {
        if (this instanceof fn) {
            return new self(...args, ...arguments);
        }
        return self.apply(ctx, args.concat(...arguments));
    }
}

Function.prototype.myCall = function(context) {
    var context = context || window;
    context.fn = this;

    var args = [...arguments].slice(1);
    var result = context.fn(...args);
    delete context.fn;
     
    return result;
}


// new模拟
function createObject(fn, ...args) {
    var obj = {};
    obj.__proto__  = fn.prototype;

    var result = fn.apply(obj, args);
    return typeof result === 'object' ? result : obj;
}

// 防抖函数
function debounce(fn, wait = 50, immediate = true) {
    let timer, context, args;

    const later = () => setTimeout(() => {
        timer = null;

        if (!immediate) {
            fn.apply(context, args);
            context = args = null;
        }
    }, wait)

    return function(...params) {
        if (!timer) {
            timer = later();
            if (immediate) {
                fn.apply(this, params);
            } else {
                context = this;
                args = params;
            }
        } else {
            clearTimeout(timer);
            timer = later();
        }
    }
}

// 节流函数
function throttle(fn, wait) {
    let timer,
        prev = 0;

    return function() {
        let now = Date.now(),
            self = this,
            remaining = wait - (now - prev);
       
        if (remaining <= 0 || remaining > wait) {
            prev = now;
            fn.apply(self, [...arguments]);
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                prev = now;
                fn.apply(self, [...arguments]);
            }, remaining);
        }
        
    }
}

// 选择排序
function selectSort(arr) {
    var minIndex = 0,
        len = arr.length;

    for (var i = 0; i < len; i++) {
        minIndex = i;

        for (var j = i + 1; j < len; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        var temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }

    return arr;
}

// 插入排序
function InsertSort(arr) {
    var prevIndex, current,
        len = arr.length;

    for (var i = 1; i < len; i++) {
        current = arr[i];
        prevIndex = i - 1;

        while(prevIndex >= 0 && arr[prevIndex] > current) {
            arr[prevIndex + 1] = arr[prevIndex];
            prevIndex--;
        }

        arr[prevIndex + 1] = current;
    }

    return arr;
}

// 归并排序
function MergeSort(arr) {
    if (arr.length <= 1) return arr;

    var mid = Math.floor(arr.length / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid);

    return merge(MergeSort(left), MergeSort(right));
}

function merge(left, right) {
    var arr = [];

    while(left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) {
            arr.push(right.shift());
        } else {
            arr.push(left.shift());
        }
    }

    if (left.length > 0) {
        arr = arr.concat(left);
    }
    if (right.length > 0) {
        arr = arr.concat(right);
    }

    return arr;
}

// 快排
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function QuickSort(arr, left, right) {
    if (arr.length < 2) return arr;

    var partitionIndex,
        left = left ? left : 0,
        right = right ? right : arr.length - 1;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        QuickSort(arr, partitionIndex + 1, right);
        QuickSort(arr, left, partitionIndex - 1);
    }

    return arr;
}

function partition(arr, left, right) {
    var pivot = left,
        index = pivot + 1;
    
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, index - 1, pivot);

    return index - 1;
}

// 计数排序
function countSort(arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0,
        arrLen = arr.length,
        bucketLen = bucket.length;
    
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (var i = 0; i < bucketLen; i++) {
        while(bucket[i]) {
            arr[sortedIndex++] = i;
            bucket[i]--;
        }
    }

    return arr;
}

// 去重
function deduplicate(arr) {
    var result = [],
        obj = {};

    for (var i = 0, len = arr.length; i < len; i++) {
        if (!obj[arr[i]]) {
            result.push(arr[i]);
            obj[arr[i]] = true;
        }
    }

    return result;
}

function deduplicate(arr) {
    var arr = arr.sort(),
        result = [arr[0]];

    for (var i = 1, len = arr.length; i < len; i++) {
        if (arr[i] !== arr[i - 1]) {
            result.push(arr[i]);
        }
    }

    return result;
}

function deduplicate(arr) {
    return arr.filter((item, index)=> {
        return arr.indexOf(item) === index;
    })
}

function deduplicate(arr) {
    var result = [arr[0]];

    for (var i = 1, len = arr.length; i < len; i++) {
        var flag = false;
        
        for (var j = 0, jLen = result.length; j < jLen; j++) {
            if (arr[i] === result[j]) {
                flag = true;
            }
        }
        if (!flag) {
            result.push(arr[i]);
        }
    }

    return result;
}

function deduplicate(arr) {
    let result = []

    for (var i = 0, len = arr.length; i < len; i++) {
        !result.includes(arr[i]) && result.push(arr[i]);
    }

    return result
}

class Router {
    constructor() {
        this.routes = {};
        window.addEventListener('hashchange', () => {
            this.refresh();
        })
    }
    push(hash, fn) {
        this.routes[hash] = fn;
    }
    refresh() {
        const hash = location.hash.slice(1);
        this.routes[hash]();
    }
}