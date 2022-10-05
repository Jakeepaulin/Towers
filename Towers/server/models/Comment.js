import mongoose from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";
const Schema = mongoose.Schema;

export const CommentSchema = new Schema(
  {
    creatorId: { type: ObjectId, required: true, ref: "Account" },
    eventId: { type: ObjectId, required: true, ref: "Event" },
    body: { type: String, required: true, minlength: 2, maxlength: 500 },
    isAttending: { type: Boolean, default: false },
  },
  SCHEMA_OPTIONS
);

CommentSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

CommentSchema.virtual("event", {
  localField: "eventId",
  foreignField: "_id",
  justOne: true,
  ref: "Event",
});
