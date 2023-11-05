const express = require("express");
const { loginUser } = require("../controller/userLController.js");
const router = express.Router();

// // xem tat ca
// router.get("/", getClothes);

// // xem mot
// router.get("/:idClothes", getOneClothes);

//them
router.post("/", loginUser);

// //xoa
// router.delete("/:idClothes", deleteClothes);

// //sua
// router.put("/:idClothes", updateClothes);

module.exports = router;
