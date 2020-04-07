# deep-spread
Merges recursively 2 or N objects!

### Usage with 2 objects:
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

### Usage with N objects:
```js
const { injectN } = require('deep-spread');

const Object1 = {
  z: 1,
  A: 1
};
const Object2 = {
  z: 2,
  B: 2
};
const Object3 = {
  z: 3,
  C: 3
};
const Object4 = {
  z: 4,
  D: 4
};
const Merged = injectN(Object4).to(Object3).to(Object2).to(Object1).result;

console.log(Merged);
```

### Result:
```js
({ z: 4, A: 1, B: 2, C: 3, D: 4 })
```