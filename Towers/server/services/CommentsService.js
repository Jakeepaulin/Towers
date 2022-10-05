import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class CommentsService {
  async removeComment(commentId, userId) {
    const comment = await dbContext.Comment.findById(commentId);

    // @ts-ignore
    if (comment.creatorId.toString() != userId) {
      throw new BadRequest("That aint you.");
    }
    // NOTE Checks to make sure right user is deleting the right comment
    if (!comment) {
      throw new BadRequest("Invalid ticket ID");
    }

    // @ts-ignore
    await comment.remove();
    return "Comment Deleted";
  }
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comment.find({ eventId })
      .populate("creator", "name picture")
      .populate("event");
    return comments;
  }
  async createComment(commentData) {
    const event = await eventsService.getEventIfNotCancelled(
      commentData.eventId
    );
    if (event.isCanceled) {
      throw new BadRequest("This event has been canceled");
    }
    const isGoing = await dbContext.Ticket.findOne({
      eventId: commentData.eventId,
      accountId: commentData.creatorId,
    }).lean;

    if (!isGoing) {
      throw new Forbidden("You cant Comment at this time");
    }

    const comment = await dbContext.Comment.create(commentData);
    await comment.populate("creator", "name picture");
    return comment;
  }
}

export const commentsService = new CommentsService();
