const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Note", notesSchema);

module.exports = Notes;
