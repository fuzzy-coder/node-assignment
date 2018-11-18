const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
        name: {
                type: String,
                trim: true,
                required: [true, 'User name is required'],
        },
        email: {
                type: String,
                lowercase: true,
                trim: true,
                index: true,
                required: [true, 'User email is required'],
                validate: {
                        validator: function(value){
                                return /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/.test(value)
                        },
                        message: function(props){
                                return `${props.value} is not a valid email`
                        }
                }
        },
        password: {
                type: String,
                required: [true, 'A valid alphanumeric password is required with length greater than 6'],
                bcrypt: true,
                min: [6, 'Password should be of atleast 6 characters'],
                validate: {
                        validator: function(value){
                                return /^[a-zA-Z0-9]+$/.test(value)
                        },
                        message: function(props){
                                return `A valid alphanumeric password is required with length greater than 6`
                        }
                },
        },
        address: {
                type: String,
                trim: true,
                required: [true, 'User address is required']
        },
        phone: {
                type: String,
                trim: true,
                validate: {
                        validator: function(value){
                                return /^[789]\d{9}$/.test(value)
                        },
                        message: function(props){
                                return `${props.value} is not a valid phone`
                        }
                },
                required: [true, 'User phone is required']
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
                required: [true, 'User email is required'],
                validate: {
                        validator: function(value){
                                return /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/.test(value)
                        },
                        message: function(props){
                                return `${props.value} is not a valid email`
                        }
                }
        },
        phone: {
                type: String,
                trim: true,
                index: true,
                validate: {
                        validator: function(value){
                                return /^[789]\d{9}$/.test(value)
                        },
                        message: function(props){
                                return `${props.value} is not a valid phone`
                        }
                },
                required: [true, 'User phone is required']
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