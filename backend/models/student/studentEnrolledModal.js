const mongoose = require("mongoose");

const enrolledCourseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    },
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    },
    subjectFee: {
        type: Number,
        required: [true, 'Subject fee is required']
    },
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

const enrolledCourseModel = new mongoose.model('EnrolledCourse', enrolledCourseSchema);

module.exports = enrolledCourseModel;