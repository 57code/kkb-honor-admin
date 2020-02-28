const faker = require('faker')
const num = faker.random.number({ min: 1, max: 10, precision: 4 })
const word = faker.random.word()
const locale = faker.random.locale()
console.log(
    faker.random.number({ min: 0.4, max: 0.6, precision: 0.01 })
)