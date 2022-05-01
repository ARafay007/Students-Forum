const Teacher = require('../../models/teacher/teacherModel');
const AppError = require('../../utility/appError');

exports.teacherGET = async (req, res, next) => {
    try{
        const allTeacher = await Teacher.find();

        res.status(200).json({
            status: 'success',
            result: allTeacher.length,
            data: allTeacher
        })
    }
    catch(err){ next(new AppError(err, 404)) }
};

exports.teacherGetOneRecord = async (req, res, next) => {
    try{
        const teacher = Teacher.findById(req.paras.id);

        if(!teacher) return next(new AppError("Can't find this teacher", 404));

        res.status(200).json({
            status: 'success',
            data: teacher
        })
    }
    catch(err){ next(new AppError(err, 404)); }
}

exports.teacherPOST = async (req, res, next) => {
    try{
        console.log(req.file);
        console.log(req);
        const teacherObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address,
            email: req.body.email,
            city: req.body.city,
            img: req.file.path,
            salary: req.body.salary,
            salaryType: req.body.salaryType,
            isActive: req.body.isActive,
            createdBy: req.body.createdBy,
            createdAt: req.body.createdAt
        };
        const teacher = await Teacher.create(teacherObj);

        res.status(201).json({
            status: 'success',
            data: {teacher}
        });
    }
    catch(err){ 
        next(new AppError(err, 404)); 
    }
};

exports.teacherPATCH = async (req, res, next) => {
    try{
        const { firstName, lastName, gender, phone, address, email, city, salary, salaryType, isActive, updatedBy, updatedAt } = req.body;

        const teacher = await Teacher.findOneAndUpdate({_id: req.params.id}, {
            $set: {firstName, lastName, gender, phone, address, email, city, salary, salaryType, isActive, updatedAt, updatedBy}}, 
        {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: teacher
        });
    }
    catch(err){ next(new AppError(err, 404)); }
}

exports.teacherDELETE = async (req, res, next) => {
    try{
        const deletedTeacher = await Teacher.findOneAndUpdate({_id: req.params.id}, {$set: {isActive: false}}, {
            new: true,
            runValidators: true
        });

        if(!deletedTeacher){ return next(new AppError('Teacher does not matched', 400)); }

        res.status(200).json({
            status: 'success',
            data: {deletedTeacher}
        });
    }
    catch(err){ next(new AppError(err, 400)); }
};