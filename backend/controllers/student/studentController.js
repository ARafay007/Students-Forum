const Student = require('../../models/student/studentModel');
const AppError = require('../../utility/appError');

exports.studentGET = async (req, res, next) => {
    try{
        const allStudents = await Student.find();

        res.status(200).json({
            status: 'success',
            result: allStudents.length,
            data: allStudents
        })
    }
    catch(err){ next(new AppError(err, 404)) }
};

exports.studentGetOneRecord = async (req, res, next) => {
    try{
        const std = await Student.findById(req.paras.id);

        res.status(200).json({
            status: 'success',
            data: {
                std
            }
        })
    }
    catch(err){ next(new AppError("Can't find student", 404)); }
}

exports.studentPOST = async (req, res, next) => {
    try{
        const std = await Student.create(req.body);

        res.status(200).json({
            std
        });
    }
    catch(err){ next(new AppError(err, 404)); }
};

exports.studentPATCH = async (req, res, next) => {
    try{
        const std = await Student.findOneAndUpdate(req.params.id, req.body, {
            returnNewDocument: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {std}
        });
    }
    catch(err){ next(new AppError(err, 404)); }
}

exports.studentDELETE = async (req, res, next) => {
    try{
        // const deletedStd = await Student.updateOne({_id: req.params.id}, {$set: {isActive: false}});
        const deletedStd = await Student.findOneAndUpdate(req.params.id, req.body);

        if(!deletedStd){ return next(new AppError('Student does not matched', 400)); }

        res.status(200).json({
            status: 'success',
            data: deletedStd
        });
    }
    catch(err){ next(new AppError(err, 400)); }
};