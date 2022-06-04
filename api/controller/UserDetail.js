const { conn } = require("../connection");

async function UserDetail(req, res, next) {
    const {username} = req.body;

    const sql = `SELECT * FROM users WHERE username='${username}'`;
    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    if(data.length > 0) {
        data[0].units = data[0].units? data[0].units.split(','): []
        return res.send({success: true, detail: data[0]});
    }
    else
        return res.send({success: false, message: "no data available"});
}

async function UserDetailEdit(req, res, next) {
    const {username, firstname, lastname, relative, permanent_a, present_a, units,  email, mobile, pan, aadhar} = req.body;
    const sql = `UPDATE users `+
        `SET firstname='${firstname}', `+
            `lastname='${lastname}', `+
            `relative='${relative}', `+
            `permanent_a='${permanent_a}', `+
            `present_a='${present_a}', `+
            `units='${units.join(',')}', `+
            `email='${email}', `+
            `mobile='${mobile}', `+
            `pan='${pan}', `+
            `aadhar='${aadhar}' `+
        `WHERE username='${username}'`;
    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    res.send({success: true});
}

module.exports = {UserDetail, UserDetailEdit};