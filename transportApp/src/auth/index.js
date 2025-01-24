const jwt = require('jsonwebtoken');
config    = require('../config'); 

const secret = config.jwt.secret;

function tokenAsing(data) {
    return jwt.sign(data, secret); 
}

function verifyoken(token) {
    return jwt.verify(token, secret);
}

const checkToken = {
    confirmToken: function(req){
        const decoded = decodeHeader(req);
        /*
        if (decoded.id !== id) {
            throw new Error('Actions Denied!!!');
        }
        */
    }
}
function getToken(auth){
    if (!auth){
        throw new Error('Token Not Send !!!');
    }
    if (auth.indexOf('Bearer') === -1){
        throw new Error('Invalid Format !!!');
    }

    let token = auth.replace('Bearer ','');
    return token;
}

function decodeHeader(req){
    const auth      = req.headers.authorization || '';
    const token     = getToken(auth);
    const decoded   = verifyoken(token);

    req.user    = decoded;

    return decoded;
}

module.exports = {
    tokenAsing,
    checkToken
}