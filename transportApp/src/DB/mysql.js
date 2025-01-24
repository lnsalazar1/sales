const mysql     = require('mysql');
const config    = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conn;

function mysqlConn() {
    conn    = mysql.createConnection(dbConfig);

    conn.connect((err) => {
        if(err){
            console.log('db connect error:', err);
            setTimeout(mysqlConn, 200);
        }else{
            console.log('DB conection successfully!!!!');
        }
    });

    conn.on('error', err => {
        console.log('db connect error:', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            mysqlConn();
        }else{
            throw err;
        }
    })
}

mysqlConn();


function findAll(table) {
    return new Promise( (resolve, reject) => {
        conn.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function find(table, id) {
    return new Promise( (resolve, reject) => {
        conn.query(`SELECT * FROM ${table} WHERE Id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function add(table, data) {
    return new Promise( (resolve, reject) => {
        conn.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function del(table, id) {
    return new Promise( (resolve, reject) => {
        conn.query(`DELETE FROM ${table} WHERE Id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function login(table, consult) {
    return new Promise( (resolve, reject) => {
        conn.query(`SELECT * FROM ${table} WHERE ?`,consult, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    });
}

module.exports = {
    findAll,find,add,del,login,
}