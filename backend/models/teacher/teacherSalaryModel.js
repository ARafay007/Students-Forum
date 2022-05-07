import mongoose from "mongoose";

const teacherSalarySchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teacher'
    },
    students: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Student'
        }
    ],
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

const teacherSalaryModel = new mongoose.model('TeacherSalary', teacherSalarySchema);

module.exports = teacherSalaryModel;