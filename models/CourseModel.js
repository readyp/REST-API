const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add course title"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    weeks: {
      type: Number,
      required: [true, "Please add weeks long"],
    },
    tuition: {
      type: Number,
      required: [true, "Please add tuition"],
    },
    minimumSkill: {
      type: String,
      required: [true, "Please add minimun Skill"],
      enum: ["beginner", "intermediate", "profesional"],
    },
    scholarshipsAvailable: {
      type: Boolean,
      default: false,
    },
    bootcamp: {
      type: ObjectId,
      ref: "bootcamps",
    },
  },
  { timestamps: true }
);

const CourseModel = model("Course", CourseSchema);

module.exports = CourseModel;
