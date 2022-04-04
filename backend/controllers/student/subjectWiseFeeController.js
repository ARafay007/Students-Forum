import SubjectFee from '../../models/student/subjectWiseFeeModel';
import AppError from '../../utility/appError';

exports.subjectFeeGET = async (req, res, next) => {
    try{
        const allSubjectFee = await SubjectFee.find();

        res.status(200).json({
            status: 'success',
            result: allSubjectFee.length,
            data: {
                allSubjectFee
            }
        })
    }
    catch(err){ next(new AppError(err, 404)) }
};

exports.subjectFeeGetOneRecord = async (req, res, next) => {
    try{
        const subjectFee = SubjectFee.findById(req.paras.id);

        res.status(200).json({
            status: 'success',
            data: {
                subjectFee
            }
        })
    }
    catch(err){ next(new AppError("NOT FOUND", 404)); }
}

exports.subjectFeePOST = async (req, res, next) => {
    try{
        const subjectFee = await SubjectFee.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {subjectFee}
        });
    }
    catch(err){ next(new AppError(err, 404)); }
};

exports.subjectFeePATCH = async (req, res, next) => {
    try{
        const subjectFee = await SubjectFee.findOneAndUpdate(req.params.id, req.body, {
            returnNewDocument: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {subjectFee}
        });
    }
    catch(err){ next(new AppError(err, 404)); }
}

exports.subjectFeeDELETE = async (req, res, next) => {
    try{
        const subjectFee = await SubjectFee.findOneAndUpdate(req.params.id, req.body);

        if(!subjectFee){ return next(new AppError('Record does not matched', 400)); }

        res.status(200).json({
            status: 'success',
            data: subjectFee
        });
    }
    catch(err){ next(new AppError(err, 400)); }
};