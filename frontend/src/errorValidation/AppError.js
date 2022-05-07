class AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.message = message;
        this.status = statusCode;
        return Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;