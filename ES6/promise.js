
var a1 = new Promise((resolve, reject) => resolve(1));
var a2 = new Promise((resolve, reject) => reject(1));
var a3 = new Promise((resolve, reject) => resolve(1));
var a4 = new Promise((resolve, reject) => resolve(1));
var a5 = new Promise((resolve, reject) => resolve(1));
Promise.all([a1, a2, a3, a4, a5]).then((res) => {
    console.log(res);
});