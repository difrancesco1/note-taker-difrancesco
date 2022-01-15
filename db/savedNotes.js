//Dependencies 
const util = require('util'); //print formatted strings as well as some 'utility' functions that are helpful for debugging purposes
const fs = require('fs');     //js file system module allows you to work with the file system on your computer
const uuid = require('uuid').v1; //identifying information that needs to be unique within a system or network thereof


const readFile = util.promisify(fs.readFile); //converts fs.readFile (which reads the contents of the file) into a promise based method
const writeFile = util.promisify(fs.writeFile); //converts fs.writeFile (which writes the contents of the file) into a promise based method

//savedNotes uses a read method that takes a path to a file.
//It also used a write method which passes through JSON strigify before being written into the db.json file.
class savedNotes {
    read() {
        return readFile('db/db.json', 'utf8')
    }
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note))
    }

    newNote(note) { //Adds a new note to the database 
        const {title, text} = note

        if(!title || !text) { //requires you to add a title and task
            throw new Error('You need to add a title and a task.')
        }
        const newNote = {title, text, id: uuid()} //adds a UNIQUE ID using the UUID package

        return this.retrieveNotes()
            .then(notes => [...notes, newNote]) //get old notes
            .then(updatedNotes => this.write(updatedNotes)) //add the newly made note
            .then(() => this.newNote) //update the notes
    }

    retrieveNotes() { 
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
    
    //Delete function
    deleteNote(id) {
        return this.retrieveNotes()
            .then(notes => notes.filter(note => note.id !==id))
            .then(keptNotes => this.write(keptNotes))
    }
}


module.exports = new savedNotes();