const mongoose = require('mongoose');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');

exports.getUsers = async (req, res) => {
    const users = await User.find().select('_id name email createdAt updatedAt');
    res.json(users);
};

exports.getAuthUser = (req, res) => {
    if (!req.isAuthUser) {
        res.status(403).json({
            message: "you are unauthenticated. Please sign in or sign up"
        })
        return res.redirect('/signin')
    }
    res.json(req.user)
};

exports.getUserById = async (req, res, next, id) => {
    const user = await User.findOne({ _id: id });
    req.profile = user;

    const profileId =  mongoose.Types.ObjectId(req.profile._id);

    if (req.user && profileId.equals(req.user._id)) {
        req.isAuthUser = true;
        return next();
    }
    next();
};

exports.getUserProfile = (req, res) => {
    if (!req.profile) {
        return res.status(404).json({
            message: "No user found"
        });
    }
    res.json(req.profile);
};

exports.getUserFeed = async (req, res) => {
    const users = await User.find()
                .select('_id name account status')
    res.json(users);
};

const avatarUploadOptions = {
    storage: multer.memoryStorage(),
    limits: {
        // storing images files up to 1mb
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: (req, file, next) => {
        if (file.mimetype.startsWith('image/')) {
            next(null, true);
        } else {
            next(null, false);
        }
    }
}

exports.uploadAvatar = multer(avatarUploadOptions).single('avatar');

exports.resizeAvatar = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.avatar = `/static/uploads/avatars/${req.user.name}-${Date.now()}.${extension}`;
    const image = await jimp.read(req.file.buffer);
    await image.resize(250, jimp.AUTO);
    await image.write(`./${req.body.avatar}`);
    next();
};

exports.updateUser = async (req, res) => {
    req.body.updateAt = new Date().toISOString();
    const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: req.body },
        { new: true, runValidators: true }
    );
    res.json(updatedUser);
};

exports.updateStatusUser = async (req, res) => {
    req.body.updateAt = new Date().toISOString();
    // const { userId, userStatus } = req.params;

    const updateStatusUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { status: req.user.status } },

        function(err){
            if(err){
               return res.send(err);
            }
            console.log({message:"status updated"});
       }

    );
    res.json(updateStatusUser);
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    // if (!req.isAuthUser) {
    //     return res.status(400).json({
    //         message: "You are not authorized to perform this action"
    //     })
    // }
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    res.json(deletedUser);
};