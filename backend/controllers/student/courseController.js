import Course from '../../models/student/courseModel';
import AppError from '../../utility/appError';

exports.courseGET = async (req, res, next) => {
    try{
        const course = await Course.find();

        res.status(200).json({
            result: course.lenght,
            data: {course}
        });
    }
    catch(err){ next(new AppError(err, 400)); }
}

exports.courseGetOneRecord = async (req, res, next) => {
    try{
        const course = await Course.findOne(req.params.id);

        if(!course) return next(new AppError("Can't find this course", 404));

        res.status(200).json({
            data: course
        });
    }
    catch(err){ next(new AppError(err, 404)); }
}

exports.coursePOST = async(req, res, next) => {
    try{
        const course = await Course.create(req.body);

        res.status(200).json({
            data: course
        });
    }
    catch(err){next(new AppError(err, 404));}
};

exports.coursePATCH = (req, res, next) => {
    try{
        const course = await Course.findOneAndUpdate(req.params.id, req.body);

        if(!course) return next(new AppError("Can't find this course", 404));

        res.status(200).json({
            data: {course}
        });
    }
    catch(err){next(new AppError(err, 404));}
};

exports.courseDELETE = (req, res, next) => {
    try{
        const course = await Course.findOneAndUpdate(req.params.id, req.body);

        if(!course) return next(new AppError("Can't find this course", 404));

        req.status(200).json({
            data: {course}
        });
    }
    catch(err){next(new AppError(err, 404));}
};