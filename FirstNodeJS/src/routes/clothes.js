const express = require("express");
const {
    getClothes,
    createClothes,
    deleteClothes,
    updateClothes,
    getOneClothes,
} = require("../controller/clothesController.js");
const checkLogin = require("../middleware/checkLogin.js");

const router = express.Router();

// xem tat ca
router.get("/", checkLogin, getClothes);

// xem mot
router.get("/:idClothes", getOneClothes);

//them
router.post("/", checkLogin, createClothes);

//xoa
router.delete("/:idClothes", deleteClothes);

//sua
router.put("/:idClothes", updateClothes);

module.exports = router;
