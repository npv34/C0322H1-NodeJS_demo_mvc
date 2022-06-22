const fs = require('fs');
const qs = require('qs');
const cookie = require('cookie')
let UserModel = require('../model/UserModel')

class AdminController {

    constructor() {
        this.userModel = new UserModel();
    }

    showPageAdmin(req, res, pathFile) {
        fs.readFile(pathFile, 'utf8', (err, data) => {
            if (err) {
                throw new Error(err.message)
            }

            res.writeHead(200, 'success', {'Content-type': 'text/html' });
            res.write(data);
            res.end()
        })
    }

    showListUserPage(req, res, pathFile) {
        // query db
        this.userModel.getAllUser().then(dataDB => {
            fs.readFile(pathFile, 'utf8', ((err, data) => {
                if (err) {
                    throw new Error(err.message)
                }

                let html = '';
                dataDB.forEach((item, index) => {
                    html += '<tr>';
                    html += `<td>${index + 1}</td>`;
                    html += `<td>${item.name}</td>`;
                    html += `<td>${item.email}</td>`;
                    html += '</tr>';
                })

                data = data.replace('{list-user}', html);
                res.writeHead(200, 'success', {'Content-type': 'text/html' });
                res.write(data);
                res.end()

            }))
        })

    }

    showLoginPage(req, res, pathFile) {
        fs.readFile(pathFile, 'utf8', (err, data) => {
            res.writeHead(200, 'success', {'Content-type': 'text/html' });
            res.write(data);
            res.end()
        })
    }

    login(req, res) {
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })

        req.on('end', () => {
            let dataForm = qs.parse(data);
            this.userModel.checkAccount(dataForm.email, dataForm.password).then(result => {
                if (result.length > 0) {
                    // tao file luu session
                    let nameFile = Date.now();

                    // tao session login
                    let sessionLogin = {
                        'session_name_file': nameFile,
                        'data_user_login': result[0]
                    }
                    // ghi vao  file
                    fs.writeFile('./session/' + nameFile + '.txt', JSON.stringify(sessionLogin), err => {
                        if (err) {
                            throw new Error(err.message)
                        }
                    })

                    // tao cookie

                    let cookieLogin = {
                        'session_name_file': nameFile
                    }

                    res.setHeader('set-cookie', cookie.serialize('cookie_app', JSON.stringify(cookieLogin)));
                    res.writeHead(301, {Location: '/admin'})
                    res.end();
                }
            })
        })
    }

}

module.exports = AdminController;
