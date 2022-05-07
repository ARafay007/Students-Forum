import StudentEnrolled from '../../models/student/studentEnrolledCourse';
import AppError from '../../utility/appError';

exports.studentEnrolledGET = async (req, res, next) => {
    try{
        const allStudentEnrolled = await StudentEnrolled.find();

        res.status(200).json({
            status: 'success',
            result: allStudentEnrolled.length,
            data: {
                allStudentEnrolled
            }
        })
    }
    catch(err){ next(new AppError(err, 404)) }
};

exports.studentEnrolledGetOneRecord = async (req, res, next) => {
    try{
        const studentEnrolled = StudentEnrolled.findById(req.paras.id);

        res.status(200).json({
            status: 'success',
            data: {
                studentEnrolled
            }
        })
    }
    catch(err){ next(new AppError("NOT FOUND", 404)); }
}

exports.studentEnrolledPOST = async (req, res, next) => {
    try{
        const studentEnrolled = await StudentEnrolled.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {studentEnrolled}
        });
    }
    catch(err){ next(new AppError(err, 404)); }
};

exports.studentEnrolledPATCH = async (req, res, next) => {
    try{
        const studentEnrolled = await StudentEnrolled.findOneAndUpdate(req.params.id, req.body, {
            returnNewDocument: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {studentEnrolled}
        });
    }
    catch(err){ next(new AppError(err, 404)); }
}

exports.studentEnrolledDELETE = async (req, res, next) => {
    try{
        const studentEnrolled = await StudentEnrolled.findOneAndUpdate(req.params.id, req.body);

        if(!studentEnrolled){ return next(new AppError('Record does not matched', 400)); }

        res.status(200).json({
            status: 'success',
            data: studentEnrolled
        });
    }
    catch(err){ next(new AppError(err, 400)); }
};