Event Loop 

JavaScript is  **single-threaded** . The **event loop** enables async behavior by executing synchronous code first, then  **microtasks** , then  **macrotasks** .


## Main Components (Very Important)

### 🔹 Call Stack

* Executes synchronous code
* LIFO (Last In First Out)

### 🔹 Web APIs / Node APIs

* Handles async operations

  (setTimeout, HTTP calls, fs, timers)

### 🔹 Task Queues

There are  **two queues** :

| Queue Type                | Contains                                                  |
| ------------------------- | --------------------------------------------------------- |
| **Microtask Queue** | `Promise.then`,`catch`,`finally`,`queueMicrotask` |
| **Macrotask Queue** | `setTimeout`,`setInterval`,`setImmediate`, I/O      |



## 2️⃣ Execution Priority (MOST IMPORTANT)

### ✅ Universal Rule

```
Call Stack
→ Microtask Queue
→ Macrotask Queue
```

### 🔥 Node.js Exact Priority

```
Call Stack
→ process.nextTick
→ Microtasks (Promise.then / catch / finally)
→ Macrotasks (timers, I/O, setImmediate)
```

---

## 3️⃣ Queues Explained

### 🔹 Call Stack

* Runs synchronous code
* Must be **empty** before async callbacks execute

### 🔹 Microtask Queue (High Priority)

* Promise.then / catch / finally
* queueMicrotask
* MutationObserver (browser)

⚠️ **Drained completely before any macrotask**

### 🔹 Macrotask Queue (Lower Priority)

* setTimeout
* setInterval
* setImmediate
* I/O callbacks

---

## 4️⃣ Node.js Event Loop Phases (libuv)

```
1. Timers        → setTimeout / setInterval
2. I/O callbacks
3. Idle / Prepare
4. Poll          → incoming I/O
5. Check         → setImmediate
6. Close         → cleanup
```

👉 `setImmediate` runs in **Check phase**

---

## 5️⃣ Classic Output Order Examples

### Promise vs setTimeout

```js
setTimeout(() => console.log("T"), 0);
Promise.resolve().then(() => console.log("P"));
```

**Output**

```
P
T
```

---

### Promise inside setTimeout

```js
setTimeout(() => {
  console.log("T");
  Promise.resolve().then(() => console.log("P"));
}, 0);
```

**Output**

```
T
P
```

👉 Microtasks run **before next macrotask**

---

## 6️⃣ process.nextTick (Node.js ONLY)

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));
```

**Output**

```
nextTick
Promise
```

⚠️  **Danger** : Recursive `nextTick` can **starve the event loop**

---

## 7️⃣ setImmediate vs setTimeout(0)

```js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
```

🟡 Output is **NOT guaranteed**

Why?

* Depends on **Poll → Check → Timers** timing

---

## 8️⃣ Starvation Example (Bad Code ❌)

```js
function loop() {
  process.nextTick(loop);
}
loop();
```

❌ Timers, Promises, I/O → **never run**

---

## 9️⃣ Key Guarantees (Remember These)

✔ Microtasks **never interleave** with timers
✔ Microtask queue is **fully drained**
✔ Async ≠ Parallel
✔ `setTimeout(0)` ≠ immediate
✔ Event loop runs **only when stack is empty**

---

## 🔟 Interview One-Liners (Gold)

* “Promises always execute before timers.”
* “process.nextTick has higher priority than Promises.”
* “JavaScript concurrency is event-loop based, not multi-threaded.”
* “setImmediate runs in the check phase.”
* “Microtasks can starve macrotasks if misused.”

---

## 🧠 Mental Model (Visual)

```
[ Call Stack ]
      ↓
[ nextTick ]
      ↓
[ Microtasks ]
      ↓
[ One Macrotask ]
      ↓
Repeat 🔁
```

---

## 🎯 When You’re Asked: *“Explain Event Loop”*

Say this:

> “JavaScript runs synchronous code first. Once the call stack is empty, the event loop executes all microtasks like Promises, then executes one macrotask like setTimeout, and repeats this cycle.”
