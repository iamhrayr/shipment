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
    return new models.User({email, password, role})
        .save()
        .then(createdUser => {
            switch (createdUser.role) {
                case 'shipper':
                    new models.Shipper({
                        userId: createdUser._id
                    }).save();
                    break;
                case 'carrier':
                    new models.Carrier({
                        userId: createdUser._id
                    }).save();
                    break;
            }
        });
}


module.exports = {
    login,
    signup
}