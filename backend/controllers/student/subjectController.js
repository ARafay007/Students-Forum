const Subject = require('../../models/student/subjectModel');
const AppError = require('../../utility/appError');

exports.subjectGET = async (req, res, next) => {
    try{
        const allSubjects = await Subject.find();

        res.status(200).json({
            result: allSubjects.length,
            allSubjects
        });
    }
    catch(err){ new AppError(err, 404); }
};

exports.subjectGetOneRecord = async (req, res, next) => {
    try{
        const subject = await Subject.findById(req.params.id);

        res.status(200).json({
            subject
        });
    }
    catch(err){ next(new AppError("Can't find subject!", 404)); }
};

exports.subjectPOST = async (req, res, next) => {
    try{
        const subjectBody = {
            subjectName: req.body.subjectName,
            isActive: req.body.isActive,
            createdBy: req.body.createdBy,
            createdAt: req.body.createdAt
        };

        const subject = await Subject.create(subjectBody);

        res.status(201).json({
            subject
        });
    }
    catch(err){ next(new AppError(err, 404)); }
}

exports.subjectPATCH = async (req, res, next) => {
    try{
        const {subjectName, isActive, updatedBy, updatedAt} = req.body;

        const subject = await Subject.findOneAndUpdate({_id: req.params.id}, {$set: {subjectName, isActive, updatedBy, updatedAt}}, {
            new: true,
            runValidators: true
        });

        if(!subject){
            return next(new AppError(`Can't find this subject`, 404));
        }

        res.status(200).json({
            subject
        });
    }
    catch(err){ next(new AppError(err, 404)); }
};

exports.subjectDELETE = async (req, res, next) => {
    try{
        // const subject = await Subject.findOneAndUpdate({_id: req.params.id}, {$set: {isActive: false}}, {
        //     new: true,
        //     runValidators: true
        // });
        
        const subject = await Subject.deleteOne({_id: req.params.id});

        if(!subject){
            return next(new AppError(`Can't find this subject`, 404));
        }

        res.status(200).json({
            subject
        });
    }
    catch(err){ next(new AppError('Subject does not found', 404)); }
}