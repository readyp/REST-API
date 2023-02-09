const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add course title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    weeks: {
      type: Number,
      required: [true, "Please add weeks"],
    },
    tuition: {
      type: Number,
      required: [true, "Please add tuition fee"],
    },
    minimumSkill: {
      type: String,
      required: [true, "Please add minimum skill"],
      enum: ["beginner", "intermediate", "professional"],
    },
    scholarshipsAvailable: {
      type: Boolean,
      default: false,
    },
    bootcamp: {
      type: ObjectId,
      ref: "Bootcamp",
    },
  },
  { timestamps: true }
);

const CourseModel = model("Course", CourseSchema);

module.exports = CourseModel;
