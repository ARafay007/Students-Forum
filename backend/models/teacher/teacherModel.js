const mongoose = require("mongoose");
const validator = require('validator');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Teacher name is required']
    },
    lastName: String,
    gender: {
        type: String,
        required: [true, 'Please select gender.']
    },
    phone: {
        type: String,
        required: [true, 'Contact number is required.'],
        max: 11
    },
    address: {
        type: String,
        required: [true, 'Address is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email.']
    },
    city: String,
    img: String,
    salary: {
        type: Number,
        required: [true, 'Please enter salary']
    },
    salaryType: {
        type: String,
        required: [true, 'Please select salary type']
    },
    isActive: {
        type:Boolean,
        default: true
    },
    createdBy: String,
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    updatedBy: String,
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false
    }
});

teacherSchema.pre(/^find/, function(next){
    this.find({isActive: {$ne: false}});
    next();
})

const teacherModel = new mongoose.model('Teacher', teacherSchema);

module.exports = teacherModel;