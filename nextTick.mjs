var callbacks = []
var pending = false
function nextTickHandler () {
    pending = false
    var length = callbacks.length
    if (length === 0) {
        return
    }
    var cbs = callbacks.splice(0)
    for (var i = 0; i < length; i++) {
        cbs[i]()
    }
}

var callNextTick
if (typeof process === 'object'
    && process !== null
    && typeof process['nextTick'] === 'function'
) {
    callNextTick = process.nextTick
} else if (typeof MutationObserver !== 'undefined') {
    var a = 'a'
    var b = 'b'
    var value = a
    var commentNode = document.createComment(value)
    var observer = new MutationObserver(nextTickHandler)
    observer.observe(commentNode, {
        characterData: true
    })
    callNextTick = function () {
        value = value === a ? b : a
        commentNode.data = value
    }
} else {
    callNextTick = function (callback) {
        setTimeout(callback, 0)
    }
}


export default function nextTick (callback, context) {
    var cb = callback
    if (context) {
        var args = []
        var l = arguments.length
        while (--l > 1) {
            args.unshift(arguments[l])
        }
        cb = function () {
            callback.apply(context, args)
        }
    }
    callbacks.push(cb)
    if (pending) {
        return
    }
    pending = true
    callNextTick(nextTickHandler)
}
