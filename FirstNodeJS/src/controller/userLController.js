const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const { email, password, admin } = req.body;
    const userD = await userModel.findOne({ email: email });

    if (userD) {
        if (userD.password === password) {
            var tokenJWT = jwt.sign(
                //create token
                { email: email, name: userD.name, admin: userD.admin },
                "xuanrin"
            );
            // console.log("tokenJWT", tokenJWT);
            res.cookie("tokenJWT", tokenJWT, { httpOnly: true }); //creaet cookie and send to client
            res.json({ message: "Login Success" });
        } else {
            res.json({ message: "Wrong password!!" });
        }
    } else {
        res.json({ message: "User doesn't Exist" });
    }

    // console.log(userD);
};
module.exports = {
    loginUser,
};
