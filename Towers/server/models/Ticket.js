import mongoose from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";
const Schema = mongoose.Schema;

export const TicketSchema = new Schema(
  {
    eventId: { type: ObjectId, required: true, ref: "TowerEvent" },
    accountId: { type: ObjectId, required: true, ref: "Account" },
  },
  SCHEMA_OPTIONS
);

TicketSchema.virtual("account", {
  localField: "accountId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

TicketSchema.virtual("towerEvent", {
  localField: "eventId",
  foreignField: "_id",
  justOne: true,
  ref: "TowerEvent",
});
