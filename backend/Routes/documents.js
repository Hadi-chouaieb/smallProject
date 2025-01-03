const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require("../Modules/db");
const routerDocument = express.Router();
const crypto = require('crypto');

function formatDate(date) {
    const options = { day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const storage = multer.diskStorage({
    destination: 'uploads/documents', 

    filename: (req, file, cb) => {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');

        const newFileName = `${formatDate(new Date())}---${Date.now()}__${originalName}`;
        
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

routerDocument.post('/PutDemande', upload.single('document'), (req, res) => {
    try {
        const originalName = Buffer.from(req.file.originalname, 'latin1').toString('utf8');

        const newFileName = req.file.filename;
        const clubId = req.body.id;

        const query = 'INSERT INTO demande (OriginalName, PathFile, id_club, date, seeit) VALUES (?, ?, ?, ?, ?)';
        const filePath = `uploads/documents/${newFileName}`;

        db.query(query, [originalName, filePath, clubId, formatDate(new Date()), "N"], (error, results) => {
            if (error) {
                console.error('Error saving file metadata:', error);
                return res.status(500).json({ message: 'Failed to upload file.' });
            }
            res.status(200).json({ message: 'File uploaded successfully!' });
        });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ message: 'Failed to upload file.' });
    }
});



routerDocument.get('/GetFiles/:id', (req, res) => {

        const {id} = req.params
        const query = 'SELECT * FROM demande where id_club = ? order By(id_demande) desc';

        db.query(query, [id],(err, results) => {
            if (err) {
                console.error('Error retrieving document from database:', err);
                return res.status(500).json({ message: 'Error retrieving document' });
            }
            res.status(200).json(results); 
        });
});










module.exports = routerDocument;
