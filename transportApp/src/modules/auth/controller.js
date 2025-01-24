const TABLA     = 'auth';
const bcrypt    = require('bcrypt');
const auth      = require('../../auth');

module.exports = function(injectedDb) {
    
    let db = injectedDb;

    if(!db) {
        db = require('../../DB/mysql');
    }
    
    async function add(data) {
        const authData = {
            id : data.id,
        }
        if (data.user) {
            authData.user = data.user;
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password.toString(),5);
        }
        return db.add(TABLA, authData);
    }

    async function login(user, password) {
        const data = await db.login(TABLA, {user : user});
        return bcrypt.compare(password, data.password)
            .then(result => {
                if(result === true) {
                    return auth.tokenAsing({...data});
                }else{
                    throw new Error('Informacion Invalida',426);
                }
            })
    }
    
    return {
        add, 
        login,
    }
}