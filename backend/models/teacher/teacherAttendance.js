import mongoose from "mongoose";

const teacherAttendanceSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teacher',
        required: [true, 'Please select teacher']
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

const teacherAttendanceModel = new mongoose.model('TeacherAttendance', teacherAttendanceSchema);

module.exports = teacherAttendanceModel;