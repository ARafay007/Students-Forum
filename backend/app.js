const express = require("express");
const cors = require("cors");
const AppError = require("./utility/appError");
const Subject = require('./routes/subjectRoutes');
const Teacher = require('./routes/teacherRoutes');

const app = express();

app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json());

app.use('/api/subject', Subject);
app.use('/api/teacher', Teacher);

app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

module.exports = app;

