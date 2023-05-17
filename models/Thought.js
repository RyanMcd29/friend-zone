const mongoose = require('mongoose');
const Reaction = require('./Reactions');


const thoughtSchema = new mongoose.Schema({
        thoughtText: {
            type: String, 
            required: true,
        },
        createdAt: {
            type: Date,
            get: (date) => { 
                if (date) return date.toISOString().split("T") [0] }
        },
        userName: {
            type: String,
            required: true,
        },
        reactions: 
            [ Reaction ],
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
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