# deep-spread
Merges recursively 2 objects (N comming soon...)

### Usage:
```js
const { inject, deepSpread } = require('deep-spread');

const Injected = {
  A: {
    B: {
      C: 1,
      D: 'Hello',
      E: true
    }
  },
  F: 45
};
const Injector = {
  A: {
    G: 'FromInjector',
    B: {
      H: 'FromInjector'
    }
  },
  F: 'FromInjector'
}
// Here there are 2 alternatives with the same result
const Merged1 = inject(Injector).to(Injected);
const Merged2 = deepSpread(Injector, Injected);
console.log(Merged1);
```

### Result:
```js
({
  A: {
    B: { C: 1, D: 'Hello', E: true, H: 'FromInjector' },
    G: 'FromInjector'
  },
  F: 'FromInjector'
})
```
