require('dotenv').config()

const mongoose = require('mongoose')

// because mongodb url was moved to .env, moved all args -1
// and removed need for passing pw as arg
/* if (process.argv.length < 3) {
  console.log('need db pw')
  process.exit(1)
}

const pw = process.argv[2] */

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv[3] && process.argv[3]) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  person.save().then(res => {
    console.log(`${res.name} added`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}