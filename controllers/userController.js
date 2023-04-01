const { User, Thought } = require('../models')

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get single user
    getSingleUser(req, res) {
        User.find({ _id: req.params.userId })
            .select('-__v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },
    // Create new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            req.body, 
            { new: true },
            (err, results) => {
                if (result) {
                    res.status(200).json(result);
                    console.log(`Updated: ${result}`)
                } else {
                    console.log('Update failed')
                    res.status(500).json({ message: 'something went wrong' })
                }
            }

        )
    },

    // delete user and associated data
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user 
                    ? res.status(404).json({ message: 'No user with that ID found.'})
                    : Thought.deleteMany({ _id: { $in: user.thoughts } } ) 
            )
            .then(() => res.json({ message: 'User and the associated thoughts deleted.'}))
            .catch((err) => res.status(500).json(err));
        },
        
    // add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $push: { friends: req.params.friendId }},
            { new: true },
            (err, results) => {
                if (results) {
                    res.status(200).json(results);
                    console.log(`Updated: ${results}`)
                } else {
                    console.log('Update failed')
                    res.status(500).json({ message: 'something went wrong'})
                }
            })
    },
    
    // remove friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendId }},
            { new: true },
            (err, results) => {
                if (result) {
                    res.status(200).json(result);
                    console.log(`Updated: ${result}`)
                } else {
                    console.log('Update failed')
                    res.status(500).json({ message: 'something went wrong'})
                }
            })
    }
}