import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log("ERROR IN getAllNotes CONTROLLER", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Successful note creation" });
  } catch (error) {
    console.log("ERROR IN createNote CONTROLLER", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  res.status(200).json({ message: "Notes have been updates successfully" });
}

export async function deleteNote(req, res) {
  res.status(200).json({ message: "Your note has been successfully DELETED" });
}
 