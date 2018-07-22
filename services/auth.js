const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const login = ({email, password, models}) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({email}).then(user => {
            if (!user) {
                return reject('Wrong credentials');
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw reject(err);
                if (isMatch) {
                    const payload = {id: user._id, email}
                    const token = jwt.sign(payload, secret);
                    return resolve({token});
                } else {
                    return reject('Wrong credentials');
                }
            });
        })
    });
};

const signup = ({role, models, ...rest}) => {
    switch (role) {
        case 'carrier':
            return new models.Carrier({
                role: 'carrier',
                email: rest.email,
                password: rest.password,
            }).save();
        case 'shipper':
            return new models.Shipper({
                role: 'shipper',
                email: rest.email,
                password: rest.password,
            }).save();
    }
}


module.exports = {
    login,
    signup
}