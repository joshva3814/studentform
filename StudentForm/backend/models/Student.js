const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
