const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});

UserSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.method('toJSON', function () {
    // before object are the fields that i dont want to return
    // in object is stored the fields that i want to return
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('User', UserSchema);