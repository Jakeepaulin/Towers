import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventController extends BaseController {
  constructor() {
    super("api/events");
    this.router
      .get("", this.getAllEvents)
      .get("/:id", this.getEventById)
      .get("/:id/comments", this.getCommentsByEventId)
      .get("/:id/tickets", this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createEvent)
      .put("/:id", this.editEvent)
      .delete("/:id", this.cancelEvent);
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents(req.query);
      res.send(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.id);
      res.send(event);
    } catch (error) {
      next(error);
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const event = await ticketsService.getTicketsByEventId(req.params.id);
      res.send(event);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEventId(
        req.params.id
      );
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const event = await eventsService.createEvent(req.body);
      res.send(event);
    } catch (error) {
      next(error);
    }
  }
  async editEvent(req, res, next) {
    try {
      const event = await eventsService.editEvent(
        req.body,
        req.params.id,
        req.userInfo
      );
      res.send(event);
    } catch (error) {
      next(error);
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const event = await eventsService.cancelEvent(
        req.params.id,
        req.userInfo
      );
      res.send(event);
    } catch (error) {
      next(error);
    }
  }
}
