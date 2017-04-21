let callbacks = []
let pending = false
function nextTickHandler () {
    pending = false
    const callbackCopies = [...callbacks]
    callbacks.length = 0
    for (let callback of callbackCopies) {
        callback()
    }
}

let callNextTick
if (typeof process === 'object'
    && process
    && typeof process.nextTick === 'function'
) {
    callNextTick = process.nextTick
} else if (typeof MutationObserver !== 'undefined') {
    let counter = 0
    const textNode = document.createTextNode(counter)
    const observer = new MutationObserver(nextTickHandler)
    observer.observe(textNode, {
        characterData: true
    })
    callNextTick = function () {
        counter = counter === 0 ? 1 : 0
        textNode.data = String(counter)
    }
} else {
    callNextTick = setTimeout
}


module.exports = function nextTick (callback, context, ...args) {
    const func = context
        ? function () {
            callback.apply(context, args)
        }
        : callback
    callbacks.push(func)
    if (pending) {
        return
    }
    pending = true
    callNextTick(nextTickHandler)
}
