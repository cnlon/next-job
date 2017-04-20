var callbacks = []
var pending = false
function nextTickHandler () {
    pending = false
    var callbackCopies = callbacks.slice(0)
    callbacks = []
    for (var i = 0; i < callbackCopies.length; i++) {
        callbackCopies[i]()
    }
}

var callNextTick
if (typeof process === 'object'
    && process
    && typeof process.nextTick === 'function'
) {
    callNextTick = process.nextTick
} else if (typeof MutationObserver !== 'undefined') {
    var counter = 0
    var textNode = document.createTextNode(counter)
    var observer = new MutationObserver(nextTickHandler)
    observer.observe(textNode, {
        characterData: true
    })
    callNextTick = function () {
        counter = counter === 0 ? 1 : 0
        textNode.data = counter
    }
} else if (typeof setImmediate === 'function') {
    callNextTick = setImmediate
} else {
    callNextTick = setTimeout
}


module.exports = function nextTick (callback, context) {
    var func = callback
    if (context) {
        var args = []
        var l = arguments.length
        while (--l > 1) {
            args.unshift(arguments[l])
        }
        func = function () {
            callback.apply(context, args)
        }
    }
    callbacks.push(func)
    if (pending) {
        return
    }
    pending = true
    callNextTick(nextTickHandler)
}
