const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        max: 20,
        min: 3,
        required: [true, 'Student name is required.']
    },
    fatherName: {
        type: String,
        max: 20,
        min: 3,
        required: [true, 'Father name name is required.']
    },
    gender: {
        type: String,
        required: [true, 'Please select gender.']
    },
    phone: {
        type: Number,
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
    admFee: {
        type: Number,
        required: [true, 'Admission is required.']
    },
    img: String,
    class: {
        type: String,
        required: [true, 'Class is required.']
    },
    section: String,
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: String,
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    udpatedBy: String,
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false
    }
});

const StudentModel = new mongoose.model('Student', studentSchema);

module.exports = StudentModel;