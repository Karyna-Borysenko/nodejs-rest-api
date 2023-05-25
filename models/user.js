const { Schema, model } = require("mongoose"); // Mongoose schema
const { handleMongooseError } = require("../helpers");

const Joi = require("joi"); // Joi schema

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

// Joi for Register
const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

// Joi for Email
const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Joi for Login
const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

// There are usually a lot of schemes, so it’s better to combine everything at once
const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
};

module.exports = {
  User,
  schemas,
};
