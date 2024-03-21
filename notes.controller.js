const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added!'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  return notes.map((note) => `${chalk.blue(note.id)} ${note.title}`).join('\n');
}

async function removeNote(id) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgRed('Note was removed!'));
  } else {
    console.log(chalk.bgYellow('Note with this ID not found!'));
  }
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
