const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI;
console.log('conecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true,
      unique: true,
    },
    number: {
      type: String, 
      validate: {
        validator: function (value) {
          const regex = /^(\d{2,3}-\d{7,})$/;
          return regex.test(value);
        },
        message: props => `${props.value} isn't valid.`,
      },
      required: true,
      unique: true,
    },
  });


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

