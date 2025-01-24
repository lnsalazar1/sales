const TABLA = 'users';

const auth = require('../auth');

module.exports = function(injectedDb) {
    
    let db = injectedDb;

    if(!db) {
        db = require('../../DB/mysql');
    }

    function findAll() {
        return db.findAll(TABLA);
    }
    
    function find(id) {
        return db.find(TABLA, id);
    }
    
    async function add(body) {
        const user = {
            id    : body.id,
            name  : body.name,
            email : body.email,
            activ : body.activ
        }
        const resp = await db.add(TABLA, user);
        var resp2  = ''; 

        if(body.user || body.password){
            resp2 = await auth.add({
                        id: body.id,
                        user: body.user,
                        password: body.password
            })
        }
        return resp2;
    }
    
    function del(id) {
        return db.del(TABLA, id);
    }

    return {
        findAll,
        find,
        add,
        del
    }
}