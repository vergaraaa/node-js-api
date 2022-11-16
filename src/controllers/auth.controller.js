const { request, response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');

authCtrl = {};

authCtrl.getUsers = async (req = request, res = response) => {
    const users = await User.find();
    res.json(users);
}

authCtrl.createUser = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already taken',
            });
        }

        const newUser = new User(req.body);
        newUser.password = await newUser.encryptPassword(password);

        await newUser.save();

        // Generate jwt
        const token = await generateJWT(newUser.id);

        res.json({
            ok: true,
            user: newUser,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'speak to admin',
        });
    }
};

authCtrl.loginUser = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Email doesn't exist",
            });
        }

        const matchPassword = await user.matchPassword(password);
        if (!matchPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password doesn't match email",
            });
        }

        // Generate jwt
        const token = await generateJWT(user.id);
        console.log(token);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'speak to admin',
        });
    }
};

authCtrl.renewToken = async (req = request, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);

    try {
        const user = await User.findById(uid);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'speak to admin',
        });
    }

}

authCtrl.uploadProfilePic = async (req = request, res = response) => {
    const file = req.file;
    console.log(file);
    res.send('image route')
}

module.exports = authCtrl;