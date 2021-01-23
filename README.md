# React Tweeter

## redux
![redux](https://user-images.githubusercontent.com/44011462/105483516-4f28a380-5ced-11eb-965e-5596641ee6b3.png)

## Generator

### Concept
```javascript
const gen = function* () {
  console.log(1);
  yield 1;
  console.log(2);
  yield 2;
  console.log(3);
  yield 3;
}

const generator = gen();
// suspended
generator.next()  // console.log(1)
// { value: 1, done: false }
// suspended
generator.next()  // console.log(2)
// { value: 2, done: false }
// suspended
generator.next()  // console.log(3)
// { value: 3, done: false }
// suspended
generator.next()
// { value: undefined, done: true }
```

### Counter
```javascript
let i = 1;
const gen = function* () {
  while(true){
    yield i++;
  }
}

const timer = setInterval(()=>{
  const counter = gen().next();
  console.log(counter.value)
}, 1000)
```

### EventListener
```javascript
var listener = function* () {
  console.log("first click");
  yield true;
  console.log("second click");
  yield true;
};

var eventListener = listener();
document.getElementById("test")
  .addEventListener('click', (event) => {
    return eventListener.next();
  });
```