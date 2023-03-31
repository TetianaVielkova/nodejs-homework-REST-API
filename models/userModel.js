const { model, Schema } = require('mongoose');
const bCrypt = require("bcryptjs");
const crypto = require('crypto');

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        avatarURL: String,
        token: {
            type: String,
            default: null,
        },
    }
)


userSchema.pre('save', async function(next) {
    if (this.isNew) {
        const emailHash = crypto.createHash('md5').update(this.email).digest('hex');

        this.avatar = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=identicon`;
    }
    next();
});


userSchema.methods.setPassword = function(password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;