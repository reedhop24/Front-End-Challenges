let init = Date.now();
let d1, d2, d3;

let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        d1 = Date.now()
        resolve(d1-init);
    }, 2000);
});

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        d2 = Date.now();
        resolve(d2-d1);
    }, 2500);
});
let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        d3 = Date.now();
        resolve(d3-d2)
    }, 3000);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
});