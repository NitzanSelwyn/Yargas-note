const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your Notes";
};

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(note => {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note Added"));
  } else {
    console.log(chalk.red.inverse("Note Title Taken"));
  }
};

const saveNotes = noteArr => {
  const dataJSON = JSON.stringify(noteArr);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => {
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No Note Found"));
  }
};

const listNotes = () => {
  console.log(chalk.inverse("Your Notes"));

  const notes = loadNotes();

  notes.forEach(note => {
    console.log(note.title)
  });
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
