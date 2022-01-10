const router = require('express').Router();

const saveNotes = require('../db/saveNotes.js');

//retrieves all notes that already are in the database 
router.get('/notes', (req, res) => {
    saveNotes
        .recieveNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err) //sends error 500 if there is an error
        })
})

//posts a new note to the server 
router.post('/notes', (req, res) => {
    saveNotes
        .createNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json(err) //sends error 500 if there is an error
        })
})

//deletes notes using their id 
router.delete('/notes/:id', (req, res) => {
    saveNotes
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err)) //sends error 500 if there is an error
})

module.exports = router;
