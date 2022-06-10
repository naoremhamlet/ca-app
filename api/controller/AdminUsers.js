const { conn } = require("../connection");

async function AdminUsers(req, res, next) {
    const sql = `SELECT username, password FROM users`;
    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    res.send({success: true, users: data});
}

async function AddUser(req, res, next) {
    const {username, password} = req.body;
    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    res.send({success: true});
}

async function RemoveUser(req, res, next) {
    const {username} = req.body;
    const sql = `DELETE FROM users WHERE username='${username}'`;
    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    res.send({success: true});
}

async function EditUser(req, res, next) {
    const {username, password, expiry} = req.body;
    const {firstname, lastname, relative, permanent_a, present_a, units, email, mobile, pan, aadhar} = req.body;
    const {purchase_price, claim_submitted, claim_admitted, others_admitted} = req.body;

    
    let sql = `UPDATE users SET `
    if(password) sql += `password='${password}', `
    if(expiry) sql += `expiry='${expiry}', `
    if(firstname) sql += `firstname='${firstname}', `
    if(lastname) sql += `lastname='${lastname}', `
    if(relative) sql += `relative='${relative}', `
    if(permanent_a) sql += `permanent_a='${permanent_a}', `
    if(present_a) sql += `present_a='${present_a}', `
    if(units && typeof units==="object" && units.length > 0) sql += `units='${units.join(',')}', `
    if(email) sql += `email='${email}', `
    if(mobile) sql += `mobile='${mobile}', `
    if(pan) sql += `pan='${pan}', `
    if(aadhar) sql += `aadhar='${aadhar}', `
    if(purchase_price) sql += `purchase_price='${purchase_price}', `
    if(claim_submitted) sql += `claim_submitted='${claim_submitted}', `
    if(claim_admitted) sql += `claim_admitted='${claim_admitted}', `
    if(others_admitted) sql += `others_admitted='${others_admitted}', `

    sql = sql.slice(0, sql.length-2)

    sql += `WHERE username='${username}'`;

    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    res.send({success: true});
}


module.exports = {AdminUsers, AddUser, RemoveUser, EditUser}