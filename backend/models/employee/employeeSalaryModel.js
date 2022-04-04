import mongoose from "mongoose";

const employeeSalarySchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee'
    },
    basicSalary: Number,
    totalSalary: Number,
    withDraw: Number,
    remaining: Number,
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

const employeeSalaryModel = new mongoose.model('EmployeeSalary', employeeSalarySchema);

module.exports = employeeSalaryModel;