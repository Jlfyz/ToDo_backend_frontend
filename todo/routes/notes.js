const router = require('express').Router();
const verify = require('./verifyToken'); 
const Note = require('../model/Note');

//geting all notes
router.get('/', verify, async (req, res) => {
    try {
        var ans = [];
        const notes = await Note.find({ user_id: req.user.id });
        for (var i = 0; i < notes.length; i++) {
            ans.push({
                _id: notes[i]._id,
                title: notes[i].title,
                isDone: notes[i].isDone,
                date: notes[i].date
            });
        }
        res.json(ans);
    } catch (err) {
        res.json({ message: err });
    }
});

//creating note
router.post('/', verify, async (req, res) => {
    const note = new Note({
        user_id: req.user.id,
        title: req.body.title,
    });
    try {
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete note
router.delete('/:noteId', verify, async (req, res) => {
    try {
        const removedNote = await Note.remove({ _id: req.params.noteId });
        res.json(removedNote);
    } catch (err) {
        res.json({ message: err });
    }
});

//edit note
router.patch('/:noteId', verify, async (req, res) => {
    try {
        const updatedNote = await Note.updateOne({ _id: req.params.noteId }, {
            $set: {
                title: req.body.title,
                isDone: req.body.isDone
            }
        });
        res.json(updatedNote);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;