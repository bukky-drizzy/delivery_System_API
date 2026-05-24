const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'please enter a valid Email']
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, `this Password can't be less than 8 characters`],
      select: false
    },

    phone: {
      type: String,
      minlenght: 11,
      maxlenght: 11
    },

    role: {
      type: String,
      enum: ["user", "admin", "dispatcher", "rider"],
      default: "user"
    },

    isActive: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

// Hashing password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);

});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
