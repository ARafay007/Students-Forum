import mongoose from "mongoose";

const dailyExpneseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    description: {
        type: Number,
        required: [true, 'Description is required']
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

const dailyExpenseModel = new mongoose.model('DailyExpense', dailyExpneseSchema);

module.exports = dailyExpenseModel;