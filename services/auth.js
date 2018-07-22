const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const login = ({email, password, models}) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({email}).then(user => {
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const payload = {id: user._id, email}
                    const token = jwt.sign(payload, secret);
                    resolve({token});
                }
            });
        })
    });
};

const signup = ({email, password, role, models}) => {
    switch (role) {
        case 'carrier':
            return new models.Carrier({
                role: 'carrier',
                email,
                password,
            }).save();
        case 'shipper':
            return new models.Shipper({
                role: 'shipper',
                email,
                password,
            }).save();
    }
}


module.exports = {
    login,
    signup
}