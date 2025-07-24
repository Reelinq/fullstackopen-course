const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://Reelin:${password}@cluster0.rljsilg.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
 })
}

if (process.argv.length === 5) {
  const inputName = process.argv[3]
  const inputNumber = process.argv[4]

  const person = new Person({
    name: inputName,
    number: inputNumber,
  })

  person.save().then(result => {
    console.log(`added ${inputName} number ${inputNumber} to phonebook`)
    mongoose.connection.close()
  })
}