const notes = require("./notes");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");

yargs.version("1.0");

//add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.addNote(argv.title, argv.body);
  }
});

//remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.removeNote(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "list a note",
  handler: () => {
   notes.listNotes();
  }
});

yargs.command({
  command: "read",
  describe: "Read a note",
  handler: () => {
    console.log("reading a note");
  }
});

//console.log(yargs.argv);
yargs.parse();
