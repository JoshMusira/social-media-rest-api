import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Destructure and exclude sensitive fields from the response
        const { password, updatedAt, ...userData } = user._doc;

        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateUser = async (req, res) => {
    const { userId, isAdmin, password } = req.body;
    const { id } = req.params;

    // Check if the user is updating their own account or is an admin
    if (userId === id || isAdmin) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                req.body.password = hashedPassword;
            }


            // Update the user's data
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: req.body,
            });

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "Account has been updated" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(403).json({ message: "You can update only your account or are an admin" });
    }
};


export const deleteUser = async (req, res) => {
    const { userId, isAdmin } = req.body;
    const { id } = req.params;

    // Check if the user is deleting their own account or is an admin
    if (userId === id || isAdmin) {
        try {
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "Account has been deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(403).json({ message: "You can delete only your account or are an admin" });
    }
};



export const followUser = async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;

    // Check if the user is trying to follow themselves
    if (userId === id) {
        return res.status(403).json({ message: "You can't follow yourself" });
    }

    try {
        const user = await User.findById(id);
        const currentUser = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.followers.includes(userId)) {
            return res.status(403).json({ message: "You already follow this user" });
        }

        // Update followers and followings
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });

        res.status(200).json({ message: "User has been followed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
