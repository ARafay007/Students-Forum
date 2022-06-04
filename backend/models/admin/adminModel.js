const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

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
        type: String,
        required: [true, 'Contact number is required.'],
        maxlength: [11, 'This phone number has more digits']
    },
    email: {
        type: String,
        unique: [true, 'this email is already in use.'],
        lowercase: true,
        required: [true, 'Email is required.'],
        validation: [validator.isEmail, 'Please povide valid email.']
    },
    cnic: {
        type: String,
        required: [true, 'CNIC is required'],
        maxlength: 13
    },
    password: {
        type: String,
        required: [true, 'Please provide password.'],
        minlength: [8, 'Password should be in between 8 to 24 characters.'],
        maxlength: [24, 'Password should be in between 8 to 24 characters.'],
        select: false
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Please confirm your password.'],
    //     validation: {
    //         // this will only work for save and create
    //         validator: function(el){
    //             return el === this.password;
    //         },
    //         message: 'Passwords are not the same.'
    //     }
    // },
    // salary: Number,
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

adminSchema.plugin(uniqueValidator);

adminSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

adminSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};

const adminModel = new mongoose.model('Admin', adminSchema);

module.exports = adminModel;