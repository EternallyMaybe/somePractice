// proxy
var obj = new Proxy({}, {
    get: function(target, key, receiver) {
        console.log(target);
        console.log(receiver);
        console.log(`target:${target}\nkey:${key}\n`);
        Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
        console.log(`target:${target}\nkey:${key}\n`);
        Reflect.set(target, key, value, receiver);
    }
});

// 支持数组负下标
var createArray = function(...params) {
    var handler = {
        get(target, key) {
            const index = Number(key);

            if (index < 0) {
                return target[target.length + index];
            } else {
                return target[index];
            }
        }
    }

    return new Proxy([...params], handler);
}

// proxy apply
var fn = (a, b) => a + b;
var handler = {
    apply(target, ctx, args) {
        return Reflect.apply(...arguments);
    }
};
var proxy = new Proxy(fn, handler);
