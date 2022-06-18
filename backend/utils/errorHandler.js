class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode;             //For sending response we always need messgae and response code

        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports=ErrorHandler