const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
    const { name, email, picture } = req.user;

    const user = await User.findOneAndUpdate(
        { email },
        { name, picture },
        { new: true }
    );

    if (user) {
        res.json(user);
    } else {
        const newUser = await new User({
            name: email.split("@")[0],
            email,
            picture,
        }).save();
        res.json(newUser);
    }
};

exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((error, user) => {
        if (error) {
            throw new Error(error);
        } else {
            res.json(user);
        }
    });
};
