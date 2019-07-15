function MyPromise(executor) {
    var self = this;
    self.status = 'pending';
    self.data = undefined;
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
            for (var i = 0, len = self.onResolvedCallback.length; i < len; i++) {
                self.onResolvedCallback[i](value);
            }
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
            for (var i = 0, len = self.onRejectedCallback.length; i < len; i++) {
                self.onRejectedCallback[i](reason);
            }
        }
    }

    try {
        executor(resolve, reject);
    } catch(e) {
        reject(e);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    var then;
    var thenCalledOrThrow = false;

    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }

    // promise1.then onResolved或onRejected返回一个MyPromise对象
    if (x instanceof MyPromise) {
        if (x.status === 'pending') {
            x.then(function(v) {
                resolvePromise(promise2, v, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
        return;
    }

    // promise1.then onResolved或onRejected返回一个非MyPromise的对象或函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            then = x.then;
            if (typeof then === 'function') {
                then.call(x, function(v) {
                    if (thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return resolvePromise(promise2, v, resolve, reject); 
                }, function(r) {
                    if (thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return reject(r); 
                });
            } else {
                resolve(x);
            }
        } catch(e) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(e);
        }
    } else {
        resolve(x);
    }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
    var self = this;
    var promise2;

    // function(v) {return v}将值透传到下一个promise中
    onResolved = typeof onResolved === 'function' ? onResolved : function(v) {return v};
    onRejected = typeof onRejected === 'function' ? onRejected : function(r) {return r};

    if (self.status === 'resolved') {
        promise2 = new MyPromise(function(resolve, reject) {
            try {
                var x = onResolved(self.data);
                resolvePromise(promise2, x, resolve, reject);
                // 如果onResolved返回值是MyPromise对象，直接取它的结果作为promise2的结果
                // if (x instanceof MyPromise) {
                //     x.then(resolve, reject);
                // }
                // resolve(x);
            } catch(e) {
                reject(e);
            }
        })
    }

    if (self.status === 'rejected') {
        // rejected会阻止事件继续传递，因此不会调用再reject
        promise2 = new MyPromise(function(resolve, reject) {
            try {
                var x = onRejected(self.data);
                resolvePromise(promise2, x, resolve, reject);
                // if (x instanceof MyPromise) {
                //     x.then(resolve, reject);
                // }
            } catch(e) {
                reject(e);
            }
        })
    }

    if (self.status === 'pending') {
        promise2 = new MyPromise(function(resolve, reject) {
            self.onResolvedCallback.push(function(value) {
                try {
                    var x = onResolved(value);
                    resolvePromise(promise2, x, resolve, reject);
                    // if (x instanceof MyPromise) {
                    //     x.then(resolve, reject);
                    // }
                    // resolve(r);
                } catch(e) {
                    reject(e);
                }
            });
            self.onRejectedCallback.push(function(reason) {
                try {
                    var x = onRejected(reason);
                    resolvePromise(promise2, x, resolve, reject);
                    // if (x instanceof MyPromise) {
                    //     x.then(resolve, reject);
                    // }
                } catch(e) {
                    reject(e);
                }
            });
        })
    }

    return promise2;
}

var promise1 = new MyPromise(function(resolve, reject) {
    setTimeout(function(){
        reject(123)
    }, 100)
})
console.log('promise1-----------------');
console.log(promise1);
var promise2 = promise1.then(function() {
        return 321
    }, function(err) {
        console.log('err:', err);
    });
console.log('promise2-----------------');
console.log(promise2);