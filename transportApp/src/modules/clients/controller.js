const TABLA = 'clientes';

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
    
    function add(body) {
        return db.add(TABLA, body);
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