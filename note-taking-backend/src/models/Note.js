const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  id:{type:Number},
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NoteSchema);
