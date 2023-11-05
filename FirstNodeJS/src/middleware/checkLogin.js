const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
    // const tokenCheckLogin = req.cookies;
    // console.log("clg cookie", req.cookies.tokenJWT);
    const tokenCheckLogin = req.cookies.tokenJWT; //lay token
    if (tokenCheckLogin) {
        const decoded = jwt.verify(tokenCheckLogin, "xuanrin"); //ma hoa token sdfGSDHJEEWA => {nam ,email}
        req.user = decoded; //gui cho handle funct tiep theo req.user
        next(); //gui toi handle funct tiep theo
    } else {
        return res.json({ message: `You haven't login`, result: [] });
    }
    // var decoded = jwt.verify(tokenCheckLogin, "xuanrin"); //xac nhan token
    // console.log(decoded); //in ra du lieu cua jwt email , name
}
module.exports = checkLogin;
