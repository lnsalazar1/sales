const response = require('./response');

function errors(err, req, res, next){
    console.error('[Error',err);
    const status    = err.statusCode || 500;
    const message   = err.message || 'Error Interno';

    response.error(req, res, message, status);
}

module.exports = errors;