const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema(
        {
                name: {
                    type: String,
                    trim: true,
                    required: true,
                },
                email: {
                        type: String,
                        lowercase: true,
                        trim: true,
                        index: true,
                        unique: true,
                        required: true,
                },
                password: {
                        type: String,
                        required: true,
                        bcrypt: true,
                },
                address: {
                        type: String,
                        trim: true,
                        required: true,
                },
                phone: {
                        type: String,
                        trim: true,
                        required: true,
                },
                dob: {
                        type: Date,
                        required: false,
                        default: null
                }
        },
        { collection: 'users' },
);

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);

UserSchema.index({ email: 1, phone: 1 }); // compound index on email + username

module.exports = exports = mongoose.model('User', UserSchema); // export model for use