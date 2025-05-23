const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const register = async (req, res) => {
    try {
        const { name, email, password, bloodType, age, phone, pincode, state, city, available } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            name, email, password: hashedPassword, bloodType, age, phone, pincode, state, city, available
        })
        await user.save();
        res.status(201).json({ message: "User Registered successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error, success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ token, user: userData });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = {
    register,
    login
}