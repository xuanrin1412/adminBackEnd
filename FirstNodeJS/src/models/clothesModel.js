const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ClothesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            // require: true,
            // unique: true,
        },
        img: {
            type: String,
            required: true,
        },
        size: {
            type: Array,
        },
        color: {
            type: Array,
        },
        desc: {
            type: String,
            // require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        category: {
            type: Array,
        },
        featured: {
            type: Boolean,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Clothes", ClothesSchema);
