const { conn } = require("../connection");
const { Upload, Delete } = require("./Upload");
const fs = require('fs');
const path = require('path');

async function Docs(req, res, next) {
    const sql = `SELECT * FROM docs`;
    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    res.send({success: true, docs: data});
}

async function AllDocs(req, res, next) {
    const sql = `SELECT * FROM docs`;
    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    res.send({success: true, docs: data});
}

async function UploadDoc(req, res, next) {
    const files = req.files;
    const errfiles = [];
    const uploadedfiles = [];
    
    for(const f of files) {
        const link = await Upload(f.filename);

        if(!link) {
            errfiles.push(f.filename);
            continue;
        }

        const sql = `INSERT INTO docs (filename, link) VALUES ('${f.filename}', '${link}')`;
        const data = await new Promise((resolve, reject) => {
            conn.query(sql, (err, result) => {
                if(err) {
                    errfiles.push(f.filename);
                } else {
                    uploadedfiles.push(f.filename);
                }

                resolve(result);
            })
        })
        fs.unlink(path.join(__dirname, `../uploads/${f.filename}`), (err) => console.log(err));
    }

    return res.send({success: true, errfiles: errfiles, uploadedfiles: uploadedfiles});
}

async function DeleteDoc(req, res, next) {
    const {filename, link} = req.body;
    const sql = `DELETE FROM docs WHERE filename='${filename}'`;
    const data = await new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if(err)
                return res.send({success: false});
            resolve(result);
        })
    })

    const d = await Delete(filename);
    if(d)
        return res.send({ success: true});
    else 
        return res.send({success:false})
}

module.exports = {Docs, AllDocs, UploadDoc, DeleteDoc};