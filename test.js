const nextJob = require('./nextJob')


const values = []

values.push(1)
nextJob(() => values.push(2))
values.push(3)

nextJob(() => {
    const result = values.toString()
    if (result !== '1,3,2') {
        throw new Error(`result: ${result}`)
    }
})
