# next-job

[![Build Status](https://travis-ci.org/cnlon/next-job.svg?branch=master)](https://travis-ci.org/cnlon/next-job)
[![npm version](https://badge.fury.io/js/next-job.svg)](https://badge.fury.io/js/next-job)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Another environment agnostic nextTick polyfill

To be used in environment agnostic modules that need nextTick functionality.

- When run in Node.js `process.nextTick` is used
- In modern browsers microtask resolution is guaranteed by `MutationObserver` [93.82%](http://caniuse.com/#search=MutationObserver)]
- In other engines `setTimeout(fn)` is used as fallback

## Installation

```bash
npm install --save next-job
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
