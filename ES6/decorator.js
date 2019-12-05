@test(true)
class MyClass {

}

function test(val) {
    return function(target) {
        target.isTestable = val; 
    }
}