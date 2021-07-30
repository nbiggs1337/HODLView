const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const CoinSchema = new mongoose.Schema({
    coin: {
        type: String,
        maxlength: [4, "Crypto symbol should be 3-4 characters!"],
        required: [true, 'Coin symbol name is required. ']
    },
    amount: {
        type: Number,
        required: [true, 'Amount of coin is required']
    }
});




const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [4, "Username minimum length is 4 characters"],
        maxlength: [21, 'Username max length is 20 characters']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"],
    },
    image: {
        type: String
    },
    cryptos: [CoinSchema]
    
}, { timestamps: true });

UserSchema.virtual('confirm')
    .get(() => this._confirm)
    .set(value => this._confirm = value);


UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirm) {
        this.invalidate('confirm', 'Password must match confirm password');
    }
    next();
});


UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports.User = mongoose.model("User", UserSchema);
module.exports.Coin = mongoose.model("Coins", CoinSchema);