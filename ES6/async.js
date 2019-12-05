function asyncFn() {
    return spawn(function*() {
        
    });
}

function spawn(genF) {
    return new Promise(function(resolve, reject) {
        let gen = genF();

        function step(nextF) {
            let next;

            try {
                next = nextF();
            } catch(err) {
                reject(err);
            }

            if (next.done) {
                return resolve(next.value);
            } 

            Promise.resolve(next.value).then(function(val) {
                    step(function() { return gen.next(val); });
                }, function(err) {
                    step(function() { return gen.throw(err); });
                },
            )
            
        }

        step(function() {
            return gen.next();
        });
    })
}