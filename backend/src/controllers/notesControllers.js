export const getAllNotes = (req, res) => {
  res.status(200).send("You fetch notes");
};

export const createNote = (req, res) => {
  res.status(201).json({ message: "Notes created successfully" });
};

export const updateNote = (req, res) => {
  res.status(200).json({ message: "Notes have been updates successfully" });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: "Your note has been successfully DELETED" });
};
