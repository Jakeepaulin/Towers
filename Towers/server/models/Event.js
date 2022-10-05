import mongoose from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";
const Schema = mongoose.Schema;

export const EventSchema = new Schema(
  {
    creatorId: { type: ObjectId, required: true, ref: "Account" },
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1500,
    },
    coverImg: { type: String, minlength: 1, maxlength: 500, required: true },
    location: { type: String, required: true, minlength: 2, maxlength: 100 },
    capacity: { type: Number, required: true, min: 0, max: 1000 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: {
      type: String,
      required: true,
      enum: ["concert", "convention", "sport", "digital"],
    },
  },
  SCHEMA_OPTIONS
);

EventSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
