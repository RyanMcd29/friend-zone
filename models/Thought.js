const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
        reactionId: {
            type: id,
            default: "132423",
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
});

const thoughtSchema = new mongoose.Schema({
        thoughtText: {
            type: String, 
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        userName: {
            type: String,
            required: true,
        },
        reactions: 
            [ reactionSchema ],
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.count;
})

const Thought = mongoose.model('Thought', thoughtSchema);

// const reactions = [];
module.exports = Thought;