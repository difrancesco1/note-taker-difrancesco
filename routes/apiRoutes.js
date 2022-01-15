//create router
const router = require('express').Router();

const savedNotes = require('../db/savedNotes.js');

//This route calls all the existing notes from the retrieveNotes method
router.get('/notes', (req, res) => {
    savedNotes                          //This calls retrieveNotes()
        .retrieveNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)  //Error if not successful 
        })
})

//This route adds a new note to the database
router.post('/notes', (req, res) => {
    savedNotes                          //This calls newNote()
        .newNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json(err) //Error if not successful 
        })
})

//This route deletes notes using their ID
router.delete('/notes/:id', (req, res) => {
    savedNotes                          //This calls deleteNote()
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err)) //Error if not successful
})

module.exports = router;



