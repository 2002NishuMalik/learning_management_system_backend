const errorMiddleware = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 900;
    err.message = err.message || "something went wrong!";

    return res.status(err.statusCode).json({
        sucess: false, 
        message: err.message,
        stack: err.stack
    })

}

export default errorMiddleware;