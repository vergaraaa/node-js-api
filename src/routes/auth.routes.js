/*
    path: api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken, getUsers, uploadProfilePic } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { upload } = require('../helpers/multer.js');

const router = Router();

router.post('/register', [
    check('name', "Name is required").not().isEmpty(),
    check('email', "Email is required").not().isEmpty(),
    check('email', "Email must be a valid email").isEmail(),
    check('password', "Password is required").not().isEmpty(),
    validateFields,
], createUser);

router.post('/login', [
    check('email', "Email is required").not().isEmpty(),
    check('email', "Email must be a valid email").isEmail(),
    check('password', "Password is required").not().isEmpty(),
    validateFields,
], loginUser);

router.get('/renew', validateJWT, renewToken);

router.get('/users', getUsers);

router.post('/profile-pic', upload.single('image'), uploadProfilePic);

// router.post('/profile-pic', upload.fields([
//     {
//         name: 'edgar', maxCount: 1
//     }, {
//         name: 'images', maxCount: 5
//     }
// ]), uploadProfilePic);

module.exports = router;