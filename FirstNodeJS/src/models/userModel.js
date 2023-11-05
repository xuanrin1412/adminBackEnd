const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
});

// UserSchema.path("name").validate(async function (value) {
//     const existingDocument = await this.constructor.findOne({ name: value });
//     if (existingDocument) {
//         this.invalidate("name", "Tên đã được sử dụng");
//     }
// }, "Tên đã được sử dụng");

// UserSchema.path("email").validate(async function (value) {
//     const existingDocument = await this.constructor.findOne({ email: value });
//     if (existingDocument) {
//         this.invalidate("email", "Email đã được sử dụng");
//     }
//     console.log("existingDocument", existingDocument);
// }, "Email đã được sử dụng");

module.exports = mongoose.model("User", UserSchema);
