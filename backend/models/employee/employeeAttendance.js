import mongoose from "mongoose";

const employeeAttendanceSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee',
        required: [true, 'Please select employee']
    },
    isPresent: {
        type: Boolean,
        required: [true, 'Please mark attendance']
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

const employeeAttendanceModel = new mongoose.model('EmployeeAttendance', employeeAttendanceSchema);

module.exports = employeeAttendanceModel;