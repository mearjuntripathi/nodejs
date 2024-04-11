const jwt = require('jsonwebtoken');
const secretKey = "mearjuntripathi";

function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        name: user.name 
    };
    return jwt.sign(payload,secretKey);
}

function getUser(token){
    return jwt.verify(token, secretKey);
}

module.exports = {setUser,getUser}