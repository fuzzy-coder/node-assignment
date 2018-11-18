const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
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
        },
        contacts: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserContact'
        }]
}, {
        collection: 'users'
}, );

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.index({
        email: 1,
        phone: 1
}, {
        unique: true
}); // compound index on email + username

const UserContactSchema = new mongoose.Schema({
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
                required: true,
        },
        phone: {
                type: String,
                trim: true,
                index: true,
                required: true,
        },
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        }
}, {
        collection: 'user_contacts'
}, );

UserContactSchema.index({
        email: 1,
        phone: 1
}, {
        unique: true
});

UserSchema.pre('remove', function (next) {
        this.model('UserContact').remove({
                user: this._id
        }, next);
})

module.exports = {
        User: mongoose.model('User', UserSchema),
        UserContact: mongoose.model('UserContact', UserContactSchema)
}