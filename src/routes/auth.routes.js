/*
    path: api/auth
*/

const { Router } = require('express');
// const { check } = require('express-validator');

const { createUser, loginUser, renewToken, getUsers } = require('../controllers/auth.controller');
// const { validateFields } = require('../middlewares/validate-fields');
// const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/renew', renewToken);

router.get('/users', getUsers);

module.exports = router;