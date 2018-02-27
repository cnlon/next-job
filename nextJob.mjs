var callbacks = []
var pending = false
function nextJobHandler () {
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

var callNextJob
if (typeof process === 'object'
    && process !== null
    && typeof process['nextTick'] === 'function'
) {
    callNextJob = process.nextTick
} else if (typeof MutationObserver !== 'undefined') {
    var a = 'a'
    var b = 'b'
    var value = a
    var commentNode = document.createComment(value)
    var observer = new MutationObserver(nextJobHandler)
    observer.observe(commentNode, {
        characterData: true
    })
    callNextJob = function () {
        value = value === a ? b : a
        commentNode.data = value
    }
} else {
    callNextJob = function (callback) {
        setTimeout(callback, 0)
    }
}


export default function nextJob (callback, context) {
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
    callNextJob(nextJobHandler)
}
