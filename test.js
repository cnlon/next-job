const nextTick = require('./nextTick')


const values = []

values.push(1)
nextTick(() => values.push(2))
values.push(3)

nextTick(() => {
    const result = values.toString()
    if (result !== '1,3,2') {
        throw new Error(`result: ${result}`)
    }
})
