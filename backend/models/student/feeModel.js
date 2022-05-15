import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'StudentModel'
    },
    fee: Number,
    arrears: Number,
    description: String,
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

const feeModel = new mongoose.model('fee', feeSchema);

module.exports = feeModel;