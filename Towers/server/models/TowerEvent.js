import mongoose from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";
const Schema = mongoose.Schema;

export const TowerEventSchema = new Schema(
  {
    creatorId: { type: ObjectId, required: true, ref: "Account" },
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    description: { type: String, required: true, minlength: 2, maxlength: 500 },
    coverImg: { type: String, minlength: 1, maxlength: 500, required: true },
    location: { type: String, required: true, minlength: 2, maxlength: 100 },
    capacity: { type: Number, required: true, min: 1, max: 100 },
    startDate: { type: Date, required: true },
    isCancelled: { type: Boolean, default: false },
    type: { type: String, enum: ["concert", "convention", "sport", "digital"] },
  },
  SCHEMA_OPTIONS
);

TowerEventSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
