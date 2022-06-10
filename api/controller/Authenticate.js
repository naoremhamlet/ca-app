const { conn } = require("../connection");
const moment = require('moment')

async function Authenticate(req, res, next) {
    const {username, password} = req.body;
    const today = moment().format('YYYY-MM-DD')
    const sql = `SELECT * FROM users WHERE username='${username}' AND password='${password}' AND (expiry IS NULL OR expiry > '${today}')`;

    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    if(data.length > 0)
        return res.send({success: true, username: data[0].username, filled: data[0].email && data[0].firstname});
    else
        return res.send({success: false, message: "wrong credentials"});
}

module.exports = {Authenticate};