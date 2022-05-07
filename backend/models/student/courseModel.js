const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Subject"
  },
  teacherId: {
    type: mongoose.Schema.ObjectId,
    ref: "Teacher"
  },
  isActive: {
    type: Boolean,
    default: true
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

const courseModel = new mongoose.model("Course", courseSchema);

module.exports = courseModel;
