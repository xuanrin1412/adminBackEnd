const clothesModel = require("../models/clothesModel.js");

// =====CREATE========================
const createClothes = async (req, res) => {
    const { title, img, size, color, desc, price, category, featured } =
        req.body;
    const isAdmin = req.user.admin;

    try {
        if (isAdmin === true) {
            const result = await clothesModel.create({
                title,
                img,
                size,
                color,
                desc,
                price,
                category,
                featured,
            });
            res.status(200).json({ result, isAdmin });
        } else {
            res.status(200).json({ message: "You are not admin", isAdmin });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

// =====GET ALL========================
const getClothes = async (req, res) => {
    // console.log("req.user", req.user); //nhan tu checkLogin.js

    try {
        const result = await clothesModel.find();
        res.status(200).json({ result, userValue: req.user });
        // console.log(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};
// =====GET ONE======================
const getOneClothes = async (req, res) => {
    const result = await clothesModel.findOne({ _id: req.params.idClothes });
    res.status(200).json({ result });
    console.log(result);
};

// =====DELETE==========================
const deleteClothes = async (req, res) => {
    try {
        const result = await clothesModel.findByIdAndDelete({
            _id: req.params.idClothes,
        });
        res.status(200).json({ message: "Successfully Deleted" });
        console.log(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};
// =====UPDATE===========================
const updateClothes = async (req, res) => {
    try {
        const result = await clothesModel.findByIdAndUpdate(
            req.params.idClothes,
            req.body,
            { new: true }
        );
        res.status(200).json({ result });
        console.log(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};
module.exports = {
    createClothes,
    getClothes,
    getOneClothes,
    deleteClothes,
    updateClothes,
};
