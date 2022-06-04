const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin/adminModel');
const AppError = require('../../utility/appError');

exports.SignUp = async (req, resp, next) => {
    try{
        const newUser = await Admin.create(req.body);

        resp.status(200).json({
            data: newUser
        });
    }
    catch(err){
        next(new AppError(err, 400));
    }
}

exports.login = async (req, resp, next) => {
    try{
        const {email, password} = req.body;

        // 1) Check if email and password exist
        if(!email || !password){
            throw 'Please provide email and password';
        }

        // 2) Check if user exists and password is correct
        const user = await Admin.findOne({email}).select('+password');

        if(!user || !(await user.correctPassword(password, user.password))){
            throw 'Username or password is incorrect!';
        }

        // 3) If everthing ok, send token to cleint
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        resp.status(200).json({
            status: 'success',
            token
        });
    }
    catch(err){
        next(new AppError(err, 400));
    }
}