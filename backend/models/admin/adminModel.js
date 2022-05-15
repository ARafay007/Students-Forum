import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs/dist/bcrypt";

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    phone: {
        type: Number,
        required: [true, 'Contact number is required.'],
        max: 11
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required.'],
        validation: [validator.isEmail, 'Please povide valid email.']
    },
    cnic: {
        type: Number,
        required: [true, 'CNIC is required'],
        max: 13
    },
    password: {
        type: String,
        required: [true, 'Please provide password.'],
        min: [8, 'Password should be in between 8 to 24 characters.'],
        max: [24, 'Password should be in between 8 to 24 characters.'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validation: {
            // this will only work for save and create
            validator: function(el){
                return el === this.password;
            },
            message: 'Passwords are not the same.'
        }
    },
    salary: Number,
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