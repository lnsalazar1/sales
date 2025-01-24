exports.success = function(req, res, message, status) {

    const statusCode    = status || 200;
    const messageOK     = message || '';
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: messageOK
    })
}

exports.error = function(req, res, message, status) {

    const statusCode    = status || 500;
    const messageError  = message || 'Error Interno';
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: messageError
    })
}