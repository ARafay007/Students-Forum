const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: [true, 'Subject name is required.']
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
    updatedBy: {
        type: String,
        default: ''
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false
    }
});

// subjectSchema.pre(/^find/, function(next){
//     this.find({isActive: {$ne: false}});
//     next();
// });

const subjectModel = new mongoose.model('Subject', subjectSchema);

module.exports = subjectModel;