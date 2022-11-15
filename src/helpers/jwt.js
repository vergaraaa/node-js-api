const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24hrs',
        }, (err, token) => {
            if (err) {
                reject('could not generate jwt');
            }

            resolve(token);
        });
    })

}

module.exports = { generateJWT };