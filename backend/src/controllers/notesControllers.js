import Note from "../models/Note.js";

//get all notes
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //latest ones first
    res.status(200).json(notes);
  } catch (error) {
    console.log("ERROR IN getAllNotes CONTROLLER", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//get note bby id
export async function getNoteByID(req, res) {
  try {
    const anote = await Note.findById(req.params.id);
    if (!anote) return res.status(404).json({ message: "note not found" });
    res.status(200).json(anote);
  } catch (error) {
    console.log("ERROR IN getNoteByID CONTROLLER", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//notes created
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("ERROR IN createNote CONTROLLER", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//notes updated
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res
        .status(404)
        .json({ messge: "note not found, ID does nott exist" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("ERROR IN updating the notes in notecontroller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//notes deleted
export async function deleteNote(req, res) {
  try {
    const { title, content } = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "id doesn't exist" });
    res
      .status(200)
      .json({ message: `note deleted successfully ${deletedNote}` });
  } catch (error) {
    console.log("ERROR IN deletenote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
