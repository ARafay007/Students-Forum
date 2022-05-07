import Fee from '../../models/student/feeModel'
import AppError from '../../utility/appError'

exports.feeGET = async (req, res, next) => {
    try{
        const allFee = await Fee.find();

        res.status(200).json({
            status: 'success',
            result: allFee.length,
            data: { allFee }
        });
    }
    catch(err){ new AppError(err, 404); }
};

exports.feeGetOneRecord = async (req, res, next) => {
    try{
        const stdFee = await Fee.findOne({studentId: req.params.id});

        if(!stdFee) return next(new AppError("No student found against this Id", 404));

        res.status(200).json({
            status: 'success',
            data: { stdFee }
        });
    }
    catch(err){ next(new AppError("Can't find StudentFee!", 404)); }
};

exports.feePOST = async (req, res, next) => {
    try{
        const stdFee = await Fee.create(req.body);

        res.status(201).json({
            status: 'success',
            data: { stdFee }
        });
    }
    catch(err){ next(new AppError(err, 404)); }
}

exports.feePATCH = async (req, res, next) => {
    try{
        const stdFee = await Fee.findOneAndUpdate(req.params.id, req.body);

        if(!stdFee) return next(new AppError(`Can't find this student fee`, 404));

        res.status(200).json({
            status: 'success',
            data: {stdFee}
        });
    }
    catch(err){ next(new AppError(err, 404)); }
};

// exports.feeDELETE = async (req, res, next) => {
//     try{
//         const stdFee = await Fee.findOneAndUpdate(req.params.id, req.body);

//         if(!stdFee) return next(new AppError(`Can't find the fee against this student`, 404));

//         res.status(200).json({
//             status: 'success',
//             data: {stdFee}
//         });
//     }
//     catch(err){ next(new AppError('Fee record does not found', 404)); }
// }