const express = require("express");
const { createUser, logoutUser } = require("../controller/userController.js");
const userModel = require("../models/userModel.js");

const router = express.Router();

// const middleware = async (req, res, next) => {
//     const existingDocument = await userModel.findOne({
//         name: req.body.name,
//         email: req.body.email,
//     });
//     // console.log("existingDocument", existingDocument);
//     if (existingDocument) {
//         return res.status(400).json({ error: "Tên và email đã được sử dụng" });
//     }

//     next();
// };

//them
router.post("/", createUser);
router.delete("/", logoutUser);
// // xem tat ca
// router.get("/", getClothes);

// // xem mot
// router.get("/:idClothes", getOneClothes);
// //xoa
// router.delete("/:idClothes", deleteClothes);

// //sua
// router.put("/:idClothes", updateClothes);

module.exports = router;
