import { dbContext } from "../db/DbContext.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Event.find({ accountId }).populate(
      "creator",
      "name picture"
    );
    return tickets;
  }

  async createTicketForEvent(eventId, accountId) {
    const event = await eventsService.getEventIfNotCancelled(eventId);
    // const hasTicket = await this.getTicketsForEvent(eventId, accountId);

    // if (hasTicket) {
    //   return hasTicket;
    // }

    const ticket = await dbContext.Ticket.create({ eventId, accountId });
    await ticket.populate("profile", "name picture");
    // @ts-ignore
    event.capacity -= 1;
    event.save();
    return ticket;
  }
  removeTicket(ticketId, id) {
    throw new Error("Method not implemented.");
  }
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Event.find({ eventId }).populate(
      "event",
      "name description coverImg"
    );
    return tickets;
  }
  async getTicketsForEvent(eventId, accountId) {
    const ticket = await dbContext.Ticket.findOne({ eventId, accountId })
      .populate("account", "name picture")
      .populate("event", "name description coverImg");
    return ticket;
  }
}

export const ticketsService = new TicketsService();
