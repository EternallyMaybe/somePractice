function makeIterator(arr) {
    var index = 0;

    return {
        next: function() {
            return index < arr.length ? 
            {value: arr[index++], done: false} :
            {value: undefined, done: true}
        }
    }
}