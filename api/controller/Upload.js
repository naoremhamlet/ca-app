var admin = require("firebase-admin");
const path = require('path');

const serviceAccount = require("../login-app-d45ae-firebase-adminsdk-wsaci-e477e60610.json");
const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_NAME
});

const bucket = admin.storage().bucket();

async function Upload(filename) {
    const options = {
        destination: filename,
        predefinedAcl: 'publicRead'
    };
    
    const link = await bucket.upload(path.join(__dirname, `../uploads/${filename}`), options)
    .then(result => {
        const file = result[0];
        return file.getMetadata();
    }).then(results => {
        // const metadata = results[0];
        return `https://storage.cloud.google.com/${BUCKET_NAME}/${filename}`
    }).catch(error => {
        console.error(error);
        return null;
    });

    return link
}

async function Delete(filename) {
    const del = await bucket.file(filename).delete()
    .then(res => {
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    })

    return del;
}


module.exports = {Upload, Delete};
