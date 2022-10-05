import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { CommentSchema } from "../models/Comment.js";
import { TicketSchema } from "../models/Ticket.js";
import { EventSchema } from "../models/Event.js";
import { ValueSchema } from "../models/Value";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Account = mongoose.model("Account", AccountSchema);

  Ticket = mongoose.model("Ticket", TicketSchema);
  Comment = mongoose.model("Comment", CommentSchema);
  Event = mongoose.model("Event", EventSchema);
}

export const dbContext = new DbContext();
