const {promisify} = require('util');
const CryptoJS = require('crypto-js');
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
        next(new AppError(err, 401));
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

        // ---------Decrypting Password---------
        const stringToArry = password.split('');
        const extractkey = stringToArry.splice(0,5).join().replace(/,/g, '');

        const bytes = CryptoJS.AES.decrypt(stringToArry.join().replace(/,/g, ''), extractkey);
        const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);

        if(!user || !(await user.correctPassword(decryptPassword, user.password))){
            throw 'Username or password is incorrect!';
        }

        // 3) If everthing ok, send token to cleint
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        resp.cookie('JWT', token, {
            // secure: true,
            httpOnly: true,
            maxAge: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000) 
        })

        resp.status(200).json({
            status: 'success',
            token
        });
    }
    catch(err){
        next(new AppError(err, 401));
    }
};

exports.protected = async (req, res, next) => {
    try{
        let token;

        // 1) Getting token and check if it's there
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            throw 'You are not logged in! Please log in to get access.'
        }

        // 2) Verification token
        // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await Admin.findById(decoded.id);

        if(!currentUser){
            throw 'The user belonging to this token does no longer exist.'
        }

        // 4) Check if user changed the password after the token was issued
        if(currentUser.changedPasswordAfter(decoded.iat)){
            throw 'User recently changed! Please log in again';
        }

        req.user = currentUser;
        next();
    }
    catch(err){
      if(err.name === 'TokenExpiredError'){
        return next(new AppError('Your token has expired! Please log in again', 401))
      }
        next(new AppError(err, 401))
    }
}

exports.restrictTo = (...roles) => (req, res, next) => {
    try{

    }
    catch(err){
        next(new AppError(err, 403));
    }
}