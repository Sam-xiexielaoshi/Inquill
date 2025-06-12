import mongoose from "mongoose";

//shemma creating

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//model creation based off the above schemma
const Note = mongoose.model("Note", noteSchema);

export default Note;