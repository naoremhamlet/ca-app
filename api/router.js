const Router = require('express').Router();
const path = require('path');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, `${file.originalname}`);
    }
 });
const upload = multer({ storage: storage });


const { AdminUsers, AddUser, RemoveUser, EditUser } = require('./controller/AdminUsers');
const { Authenticate } = require('./controller/Authenticate');
const { Docs, AllDocs, UploadDoc, DeleteDoc } = require('./controller/Docs');
const { UserDetail, UserDetailEdit } = require('./controller/UserDetail');


Router.post('/api/authenticate', Authenticate);
Router.post('/api/user/detail', UserDetail)
Router.post('/api/user/detail/edit', UserDetailEdit);
Router.get('/api/user/doc', Docs);


Router.get('/api/admin/users', AdminUsers);
Router.post('/api/admin/users/add', AddUser);
Router.post('/api/admin/users/remove', RemoveUser);
Router.post('/api/admin/users/edit', EditUser)
Router.get('/api/admin/doc', AllDocs);
Router.post('/api/admin/doc/upload', upload.any(),  UploadDoc)
Router.post('/api/admin/doc/delete', DeleteDoc)

exports.Router = Router;