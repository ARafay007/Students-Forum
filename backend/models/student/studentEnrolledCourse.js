import mongoose from "mongoose";

const enrolledCourseSchema = new mongoose.schema({
    courseId: [
        {
            type: mongoose.schema.ObjectId,
            ref: 'Course'
        }
    ],
    studentId: {
        type: mongoose.schema.ObjectId,
        ref: 'Student'
    },
    subjectFee: {
        type: Number,
        required: [true, 'Subject fee is required']
    },
    isActive: Boolean,
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