const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [ isEmail, 'invalid email' ]
        },         
        thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'thought'
                },
            ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    
    {},
)

const User = model('user', userSchema);

module.exports = User;