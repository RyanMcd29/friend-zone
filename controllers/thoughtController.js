const { User, Thought } = require('../models')

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    // Get single thought
    getSingleThought(req, res) {
        Thought.find({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID found!' })
                    : res.json(thought)
                )
                .catch((err) => res.status(500).json(err))
    },
    // Create new thought
    createThought(req, res) {
        Thought.ceate(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true },
            (err, result) => {
                if (result) {
                    res.status(200).json(result);
                    console.log(`Updated: ${result}`)
                } else {
                    console.log('update failed')
                    res.status(500).json({ message: `Something went wrong` })
                }
            }
        )
    },
    // Delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID found.' })
                    : console.log(`Deleted ${thought} `)
            })
            .then(() => res.json({ message: 'This thought has been deleted'}))
            .catch((err) => res.status(500).json(err));
    },
}