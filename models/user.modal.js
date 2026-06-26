const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    is_online: {
      type: Boolean,
      default: false,
    },
    last_seen: {
      type: Date,
      default: null,
    },
  },{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        next();
    }
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
    });
});
const User = mongoose.model('User', userSchema);
module.exports = User;