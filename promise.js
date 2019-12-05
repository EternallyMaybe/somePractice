// function MyPromise(executor) {
//     var self = this;
//     self.status = 'pending';
//     self.data = undefined;
//     self.onResolvedCallback = [];
//     self.onRejectedCallback = [];

//     function resolve(value) {
//         if (self.status === 'pending') {
//             self.status = 'resolved';
//             self.data = value;
//             for (var i = 0, len = self.onResolvedCallback.length; i < len; i++) {
//                 self.onResolvedCallback[i](value);
//             }
//         }
//     }

//     function reject(reason) {
//         if (self.status === 'pending') {
//             self.status = 'rejected';
//             self.data = reason;
//             for (var i = 0, len = self.onRejectedCallback.length; i < len; i++) {
//                 self.onRejectedCallback[i](reason);
//             }
//         }
//     }

//     try {
//         executor(resolve, reject);
//     } catch(e) {
//         reject(e);
//     }
// }

// function resolvePromise(promise2, x, resolve, reject) {
//     var then;
//     var thenCalledOrThrow = false;

//     if (promise2 === x) {
//         return reject(new TypeError('Chaining cycle detected for promise!'));
//     }

//     // promise1.then onResolved或onRejected返回一个MyPromise对象
//     if (x instanceof MyPromise) {
//         if (x.status === 'pending') {
//             x.then(function(v) {
//                 resolvePromise(promise2, v, resolve, reject);
//             }, reject);
//         } else {
//             x.then(resolve, reject);
//         }
//         return;
//     }

//     // promise1.then onResolved或onRejected返回一个非MyPromise的对象或函数
//     if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
//         try {
//             then = x.then;
//             if (typeof then === 'function') {
//                 then.call(x, function(v) {
//                     if (thenCalledOrThrow) return;
//                     thenCalledOrThrow = true;
//                     return resolvePromise(promise2, v, resolve, reject); 
//                 }, function(r) {
//                     if (thenCalledOrThrow) return;
//                     thenCalledOrThrow = true;
//                     return reject(r); 
//                 });
//             } else {
//                 resolve(x);
//             }
//         } catch(e) {
//             if (thenCalledOrThrow) return;
//             thenCalledOrThrow = true;
//             return reject(e);
//         }
//     } else {
//         resolve(x);
//     }
// }

// MyPromise.prototype.then = function(onResolved, onRejected) {
//     var self = this;
//     var promise2;

//     // function(v) {return v}将值透传到下一个promise中
//     onResolved = typeof onResolved === 'function' ? onResolved : function(v) {return v};
//     onRejected = typeof onRejected === 'function' ? onRejected : function(r) {return r};

//     if (self.status === 'resolved') {
//         promise2 = new MyPromise(function(resolve, reject) {
//             try {
//                 var x = onResolved(self.data);
//                 resolvePromise(promise2, x, resolve, reject);
//                 // 如果onResolved返回值是MyPromise对象，直接取它的结果作为promise2的结果
//                 // if (x instanceof MyPromise) {
//                 //     x.then(resolve, reject);
//                 // }
//                 // resolve(x);
//             } catch(e) {
//                 reject(e);
//             }
//         })
//     }

//     if (self.status === 'rejected') {
//         // rejected会阻止事件继续传递，因此不会调用再reject
//         promise2 = new MyPromise(function(resolve, reject) {
//             try {
//                 var x = onRejected(self.data);
//                 resolvePromise(promise2, x, resolve, reject);
//                 // if (x instanceof MyPromise) {
//                 //     x.then(resolve, reject);
//                 // }
//             } catch(e) {
//                 reject(e);
//             }
//         })
//     }

//     if (self.status === 'pending') {
//         promise2 = new MyPromise(function(resolve, reject) {
//             self.onResolvedCallback.push(function(value) {
//                 try {
//                     var x = onResolved(value);
//                     resolvePromise(promise2, x, resolve, reject);
//                     // if (x instanceof MyPromise) {
//                     //     x.then(resolve, reject);
//                     // }
//                     // resolve(r);
//                 } catch(e) {
//                     reject(e);
//                 }
//             });
//             self.onRejectedCallback.push(function(reason) {
//                 try {
//                     var x = onRejected(reason);
//                     resolvePromise(promise2, x, resolve, reject);
//                     // if (x instanceof MyPromise) {
//                     //     x.then(resolve, reject);
//                     // }
//                 } catch(e) {
//                     reject(e);
//                 }
//             });
//         })
//     }

//     return promise2;
// }

// var promise1 = new MyPromise(function(resolve, reject) {
//     setTimeout(function(){
//         reject(123)
//     }, 100)
// })
// console.log('promise1-----------------');
// console.log(promise1);
// var promise2 = promise1.then(function() {
//         return 321
//     }, function(err) {
//         console.log('err:', err);
//     });
// console.log('promise2-----------------');
// console.log(promise2);

function Promise(executor) {
    this.value = null;
    this.state = 'pending';
    this.resolvedCallback = [];
    this.rejectedCallback = [];

    function resolve(value) {
        if (this.state === 'pending') {
            this.state = 'resolved';
            // this.resolvedCallback.forEach(fn => {
            //     fn(value);
            // });
            if (value instanceof Promise) {

            }
        }
    }

    function reject(err) {
        if (this.state === 'pending') {
            setTimeout(() => {
                this.state = 'rejected';
                this.value = err;
                this.rejectedCallback.forEach(fn => {
                    fn(err);
                });
            }, 0)
        }
    }

    try {
        executor(resolve.bind(this), reject.bind(this));
    } catch(err) {
        reject(err);
    }
}

Promise.prototype.then(onResolved, onRejected) {
    const { value, state } = this;
    onResolved = typeof onResolved === 'function' ? onResolved : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : val => val;

    // if (this.state === 'resolved') {
    //     return new Promise(function(resolve, reject) {
    //         let result = onResolved(this.value);
    //         resolve(result);
    //     });
    // }
    // if (this.state === 'rejected') {
    //     return new Promise(function(resolve, reject) {
    //         let result = onRejected(this.value);
    //         reject(result);
    //     });
    // } 
    // if (this.state === 'pending') {
    //     return new Promise(function(resolve, reject) {
    //         this.resolvedCallback.push(function(value) {
    //             let result = onResolved(value);
    //             resolve(result);
    //         });
    //         this.rejectedCallback.push(function(err) {
    //             let result = onRejected(err);
    //             reject(result);
    //         });
    //     })
        
    // } 
    return new Promise((resolve, reject) => {
        let resolved = val => {
            try {
                let result = onResolved(val);
                if (result instanceof Promise) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch(err) {
                reject(err);
            }
        };

        let rejected = reason => {
            try {
                let result = onRejected(val);
                if (result instanceof Promise) {
                    result.then(resolve, reject);
                } else {
                    reject(result);
                }
            } catch(err) {
                reject(err);
            }
        }

        switch(state) {
            case 'pending': 
                this.resolvedCallback.push(resolved);
                this.rejecteddCallback.push(rejected);
                break;
            case 'resolved':
                resolved(value);
                break;
            case 'rejected':
                rejected(value);
                break;
        }
    });
}

function resolvePromise(val, resolve, reject) {
    if (val instanceof Promise) {
        val.then(resolve, reject);
        return;
    }

    if (val !== null && 
    (
        typeof val === 'object' ||
        typeof val === 'function'
    ) &&
        typeof val.then === 'function'
    ) {
        val.then(resolve, reject);
        return;
    }

    
}

function fn(...args) {
    return spawn(function* () {

    });
}


function spawn(genFn) {
    return new Promise((resolve, reject) => {
        const fn = genFn();

        function step(nextRes) {
            if (!nextRes.done) {
                step(fn.next(nextRes.value));
            } else {
                resolve(nextRes.value);
            }
        }
        step(fn.next());

    })
}
