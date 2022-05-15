import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    gender: {
        type: Boolean,
        required: [true, 'Please select gender']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    city: String,
    phone: {
        type: Number,
        required: [true, 'Contact number is required.'],
        max: 11
    },
    image: String,
    salary: Number,
    destination: String,
    isActive: Boolean,
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

const employeeModel = new mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;