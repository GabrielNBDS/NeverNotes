var express = require("express");
var router = express.Router();
const Note = require("../models/notes");
const withAuth = require("../middlewares/auth");

router.post("/", withAuth, async (req, res) => {
  const { title, body } = req.body;

  try {
    let note = new Note({ title: title, body: body, author: req.user._id });

    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
});

router.get("/search", withAuth, async (req, res) => {
  const { query } = req.query;
  try {
    let notes = await Note
    .find({author: req.user._id })
    .find({$text: {$search: query}})
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.get("/", withAuth, async (req, res) => {
  try {
    let notes = await Note.find({ author: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let note = await Note.findById(id);
    if (isOwner(req.user, note)) {
      res.json(note);
    } else {
      res.status(403).json({ error: "Forbidden note" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting notes" });
  }
});


router.put("/:id", withAuth, async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  try {
    let note = await Note.findById(id);
    if (isOwner(req.user, note)) {
      let note = await Note.findOneAndUpdate(
        { _id: id },
        { $set: { title: title, body: body } },
        { upsert: true, "new": true }
      );

      res.json(note);
    } else {
      res.send(403).json({ error: "Forbidden Note" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating note" });
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  const { id } = req.params;
  try {
    let note = await Note.findById(id);
    if (isOwner(req.user, note)) {
      await note.delete();
      res.status(204).json({ message: "Deleted" });
    } else {
      res.send(403).json({ error: "Forbidden Note" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting note" });
  }
});

const isOwner = (user, note) => {
  if (JSON.stringify(user._id) == JSON.stringify(note.author._id)) {
    return true;
  } else {
    return false;
  }
};

module.exports = router;
