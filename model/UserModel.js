let Database = require("./Database");

class UserModel {
    constructor() {
        this.conn = Database.connect();
    }

    getAllUser() {
        return new Promise(((resolve, reject) => {
            let sql = 'SELECT * FROM users';
            this.conn.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data)
            })
        }))
    }

    checkAccount(email, password) {
        return new Promise(((resolve, reject) => {
            let sql = `SELECT name, email FROM users WHERE email = '${email}' AND password = '${password}'`;
            this.conn.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                }
                console.log(data)
                resolve(data)
            })
        }))
    }
}

module.exports = UserModel;
