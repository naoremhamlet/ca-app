const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');


dotenv.config({
    path : path.join(__dirname,'../.env')
});


const conn = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    multipleStatements : true,
});


setInterval(() => {
    conn.query('SELECT 1');
}, 20000)
// var conn;

// function handleDisconnect() {
//     conn = mysql.createConnection(db_config);

//     conn.connect((err) => {
//         if(err) {
//             setTimeout(handleDisconnect, 5000);
//         }
//     });

//     conn.on('error', (err) => {
//         if(err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
//             handleDisconnect();
//         } else {
//             console.log(err)
//         }
//     });
// }

// handleDisconnect();



exports.conn = conn;