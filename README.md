# nextjob

[![npm version](https://badge.fury.io/js/nextjob.svg)](https://badge.fury.io/js/nextjob)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Another environment agnostic nextJob(nextTick) polyfill

To be used in environment agnostic modules that need nextJob functionality.

- When run in Node.js `process.nextTick` is used
- In modern browsers microtask resolution is guaranteed by `MutationObserver` [93.82%](http://caniuse.com/#search=MutationObserver)]
- In other engines `setTimeout(fn)` is used as fallback

## Installation

```bash
npm install --save nextjob
```

## Syntax

```
nextJob(func[, context, param1, param2, ...])
```

**func**

A function to be executed.

**context** [Optional]

The context to be bound by `func`.

**param1, param2, ..., paramN** [Optional]

Additional parameters which are passed through to `func`.

<hr>

Stealed from [Vue.js](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js) and [next-tick](https://github.com/medikoo/next-tick).
