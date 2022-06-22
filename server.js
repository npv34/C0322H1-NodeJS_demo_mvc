const http = require('http');
const url = require('url');
const AdminController = require('./controller/AdminController');
let adminController = new AdminController();

const server = http.createServer(((req, res) => {
    let urlPath = url.parse(req.url).pathname;
    let methodReq = req.method;

    //Xu ly router
    switch (urlPath) {
        case '/admin':
            adminController.showPageAdmin(req, res, './view/admin/index.html');
            break;
        case '/admin/users':
            adminController.showListUserPage(req, res, './view/admin/users/list.html')
            break;
        case '/admin/login':
            if (methodReq === 'GET') {
                adminController.showLoginPage(req, res, './view/admin/login.html');
            }  else {
                adminController.login(req, res)
            }

            break;

        default:
            res.end('404 Not Found');


    }

}))

server.listen(8080, 'localhost', () => {
    console.log('server running in port 8080')
})
