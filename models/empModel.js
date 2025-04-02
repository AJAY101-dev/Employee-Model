const mongoose = require('mongoose');


const empSchema = new mongoose.Schema(
  {
    name: {type: String,required: true, },
    email: {type: String,required: true, unique: true,  match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],},
    password: {
      type: String,
      required: true, 
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    phoneNo: {
      type: String,
      required: true, 
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'], 
    },
    address: {
      type: String,
     
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'], 
      required: true, 
    },
    createdAt: {
      type: Date,
      default: Date.now,  // implementing the defult date 
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  },
  {
    versionKey : false,     // will disable the by default version value by mongodb every time it updating it 
  }
);


const Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;
