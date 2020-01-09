const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true)

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://mark:${password}@cluster0-gpszd.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(response => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else {
    console.log('phonebook:')
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}