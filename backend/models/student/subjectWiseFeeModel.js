import mongoose from "mongoose";

const subjectWiseFeeSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    },
    Student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    },
    fee: Number,
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

const subjectWiseFeeModel = new mongoose.model('SubjectWiseFee', subjectWiseFeeSchema);

module.exports = subjectWiseFeeModel;