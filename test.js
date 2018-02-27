var nextJob = require('./nextJob')


var values = []

values.push(1)
nextJob(function () {
    values.push(2)
})
values.push(3)

nextJob(function () {
    var result = values.toString()
    if (result !== '1,3,2') {
        throw new Error('result: ' + result)
    }
})
