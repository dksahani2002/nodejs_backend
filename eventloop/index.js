//setTimeout goes to Macrotask Queue
// Stack must be empty before it runs

console.log("start");//stack
setTimeout(()=>{
    console.log("timeoout");//macrotask queue
},0);
console.log("end");//stack
// Execution Order:
// 1. "start" (stack)
// 2. "end" (stack)
// 3. "timeout" (macrotask queue)   

// microtask queue vs macrotask queue
// Microtask queue has higher priority than Macrotask queue
// Microtask queue examples: Promises, process.nextTick (Node.js)
// Macrotask queue examples: setTimeout, setInterval, setImmediate (Node.js), I/O operations

Example:

console.log("start");//stack

setTimeout(()=>{
    console.log("timeout");//macrotask queue
},0);

Promise.resolve().then(()=>{
    console.log("promise");//microtask queue
});

console.log("end");//stack

// Execution order:
// 1. "start" (stack)
// 2. "end" (stack)
// 3. "promise" (microtask queue)
// 4. "timeout" (macrotask queue)               


// Nested Microtasks
console.log("start");//stack

Promise.resolve().then(()=>{
    console.log("promise1");//microtask queue
    Promise.resolve().then(()=>{
        console.log("promise2");//microtask queue
    });
});

console.log("end");//stack

// Execution order:
// 1. "start" (stack)
// 2. "end" (stack)
// 3. "promise1" (microtask queue)
// 4. "promise2" (microtask queue)

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