const path = require('path');

const router = require('express').Router();

//Sends notes.html if there is a request
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//Used for all other routes (aside from the /notes)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;