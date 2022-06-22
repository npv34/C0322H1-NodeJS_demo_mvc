const mysql = require('mysql')

class Database {
    constructor() {
    }

    static connect()  {
        return mysql.createConnection({
            'host': '127.0.0.1',
            'user': 'root',
            'password': '123456@Abc',
            'database': 'user_manager'
        })
    }
}

module.exports = Database;
