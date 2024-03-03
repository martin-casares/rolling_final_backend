const mongoose = require("mongoose");

const defaultAvatars = {
  user:
    "https://i.pinimg.com/564x/48/84/3b/48843b6ea8fead404661af7b00397142.jpg",

  admin:
    "https://i.pinimg.com/564x/e6/c2/0e/e6c20ec105eaa6752c4f9d1f306eab66.jpg",
};

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: function () {
        return defaultAvatars[this.rol];
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
