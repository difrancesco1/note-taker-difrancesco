//Required Consts
const fs = require('fs');
const util = require('util');
const uuid = require('uuid').v1;

//function that reads files
const readNotes = util.promisify(fs.readFile); 

//functions that writes files
const writeNotes = util.promisify(fs.writeFile); 

class storeNotes {
    read() {
        return readNotes('db/db.json', 'utf8')
    }
    write(note) {
        return writeNotes('db/db.json', JSON.stringify(note))
    }

    createNote(note) {
        const {title, text} = note

        if(!title || !text) {
            throw new Error('Please insert a title and task')
        }
        const newFile = {title, text, id: uuid()} 

        return this.createNote()
            .then(notes => [...notes, newFile]) 
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newFile) 
    }

    recieveNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }

    removeNote(id) {
        return this.recieveNotes()
            .then(notes => notes.filter(note => note.id !==id))
            .then(savedNotes => this.write(savedNotes)) 
    }
}
module.exports = new storeNotes();