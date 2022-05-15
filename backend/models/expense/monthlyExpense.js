import mongoose from "mongoose";

const monthlyExpenseSchema = new mongoose.Schema({
    totalTeacherSalary: Number,
    totalEmployeeSalary: Number,
    totalDailySalary: Number,
    totalStudentFee: Number,
    saving: Number,
    dateAndTime: Date
});

const monthlyExpenseModel = new mongoose.model('MonthlyExpense', monthlyExpenseSchema);

module.exports = monthlyExpenseModel;