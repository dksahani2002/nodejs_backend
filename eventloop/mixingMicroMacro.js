// Mixing Microtasks and Macrotasks
console.log("start");//stack

setTimeout(()=>{
    console.log("timeout1");//macrotask queue
    Promise.resolve().then(()=>{
        console.log("promise2");//microtask queue
    });
},0);

Promise.resolve().then(()=>{
    console.log("promise1");//microtask queue
    setTimeout(()=>{
        console.log("timeout2");//macrotask queue
    },0);
});

console.log("end");//stack

// Execution order:
// 1. "start" (stack)
// 2. "end" (stack)      

// 3. "promise1" (microtask queue)
// 4. "timeout1" (macrotask queue)
// 5. "promise2" (microtask queue)
// 6. "timeout2" (macrotask queue)  