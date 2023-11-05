const userModel = require("../models/userModel.js");

// ===== REGISTER ========================
const createUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password, admin } = req.body;
    try {
        const userE = await userModel.findOne({ email });
        if (userE) {
            return res.json({ message: "Email đã tồn tại" });
        }
        const userN = await userModel.findOne({ name });
        if (userN) {
            return res.json({ message: "Name đã tồn tại" });
        }

        const createUser = await userModel.create({
            name,
            email,
            password,
            admin,
        });

        res.status(200).json({ createUser, message: "Created User" });
    } catch (err) {
        res.status(500).json({ err });
    }
};

// =====LOGOUT==========================
const logoutUser = async (req, res) => {
    const deleteJWT = res.clearCookie("tokenJWT");
    if (deleteJWT) {
        res.json({ message: "Logout Success" });
    } else {
        res.json({ message: "Logout Defeat" });
    }
};

module.exports = { createUser, logoutUser };
// =====UPDATE===========================
// export const updateUser = async (req, res) => {
//     try {
//         const result = await userModel.findByIdAndUpdate(
//             req.params.iduser,
//             req.body,
//             { new: true }
//         );
//         res.status(200).json({ result });
//         console.log(result);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };
// // =====GET ALL========================
// export const getUser = async (req, res) => {
//     try {
//         const result = await userModel.find();
//         res.status(200).json({ result });
//         console.log(result);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };
// // =====GET ONE======================
// export const getOneUser = async (req, res) => {
//     const result = await userModel.findOne({ _id: req.params.idUser });
//     res.status(200).json({ result });
//     console.log(result);
// };

// // =====DELETE==========================
// export const deleteUser = async (req, res) => {
//     try {
//         const result = await userModel.findByIdAndDelete({
//             _id: req.params.idUser,
//         });
//         res.status(200).json({ message: "Successfully Deleted" });
//         console.log(result);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };
