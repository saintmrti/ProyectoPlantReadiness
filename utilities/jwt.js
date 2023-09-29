const jwt = require('jwt-simple');
const moment = require('moment');
const { SECRET_TOKEN } = require('../config');

module.exports.generateToken = (userId, userName, userEmail, admin) => jwt.encode({
    userId,
    userName,
    userEmail,
    admin,
    iat: moment().unix(),
    exp: moment().add(21, 'days').unix(),
}, SECRET_TOKEN);

module.exports.decodeToken = token => new Promise((resolve, reject) => {
    try {
        const { userId, admin } = jwt.decode(token, SECRET_TOKEN);
        resolve({ userId, admin });
    } catch (error) {
        reject('Token no válido');
    }
})