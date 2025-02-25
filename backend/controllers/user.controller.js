const User = require('../models/user.model')

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const searchBlood = async (req, res) => {
    try {
        const { state, city, pincode } = req.query;
        let query = {};
        if (pincode) {
            query.pincode = pincode;
        } else {
            if (state) query.state = state;
            if (city) query.city = city;
        }
        const donors = await User.find(query);
        if (donors.length === 0) {
            return res.status(404).json({ message: "No donors found" });
        }
        res.json(donors);
    } catch (error) {
        console.error("Error fetching donors:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getProfile,
    searchBlood
}