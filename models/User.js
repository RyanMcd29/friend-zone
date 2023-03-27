const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'thought'
                },
            ],
        },
    },
    {},
)

const User = model('user', userSchema);

module.exports = User;