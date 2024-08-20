const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// Create a new note
router.post("/", async (req, res) => {
  try {
    const note = new Note({
      id:req.body.id,
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate({id:req.params.id}, req.body, {
      new: true,
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
    
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
    
  }
});

module.exports = router;
