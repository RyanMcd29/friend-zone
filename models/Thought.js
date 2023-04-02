const mongoose = require('mongoose');
const Reaction = require('./Reactions');


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
            [ Reaction ],
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = mongoose.model('Thought', thoughtSchema);

// const reactions = [];
module.exports = Thought;