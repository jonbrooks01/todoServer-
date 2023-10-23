'use strict';

const { users } = require('../models/index.js');

// const bearer = async (req, res, next) => {
//   if (!req.headers.authorization) return next('Invalid Login');

//   try {
//     const [token, authType] = req.headers.authorization.split(' ');

//     if (authType === 'Bearer') {
//       let validUser = await users.authenticateBearer(token);
//       if (validUser) {
//         req.user = validUser;
//         req.token = validUser.token;
//         return next();
//       } else {
//         res.status(403).send('Invalid Login');
//       }
//     } else {
//       res.status(403).send('Invalid Login');
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(403).send('Invalid Login');
//   }
// };

// module.exports = bearer;

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    // console.log('valid user', validUser);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
