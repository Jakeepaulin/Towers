import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketController extends BaseController {
  constructor() {
    super("api/tickets");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createTicket)
      .delete("/:ticketId", this.removeTicket);
  }

  async createTicket(req, res, next) {
    try {
      const ticket = await ticketsService.createTicketForEvent(
        req.body.eventId,
        req.userInfo.id
      );
      res.send(ticket);
    } catch (error) {
      next(error);
    }
  }
  async removeTicket(req, res, next) {
    try {
      const ticket = await ticketsService.removeTicket(
        req.params.ticketId,
        req.userInfo.id
      );
      res.send(ticket);
    } catch (error) {
      next(error);
    }
  }
}
