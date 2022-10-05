import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Ticket.find({ accountId }).populate(
      "event"
    );
    return tickets;
  }

  async createTicketForEvent(eventId, accountId) {
    const event = await eventsService.getEventIfNotCancelled(eventId);

    const ticket = await dbContext.Ticket.create({ eventId, accountId });
    // @ts-ignore

    if (event.capacity <= 0) {
      throw new BadRequest("This Event is Sold Out... Sorry");
    }
    await ticket.populate("profile", "name picture");
    // @ts-ignore
    event.capacity -= 1;
    event.save();
    ticket.save();
    return ticket;
  }
  async removeTicket(ticketId, id) {
    const ticket = await dbContext.Ticket.findById(ticketId);

    if (!ticket) {
      throw new BadRequest("Invalid ticket ID");
    }
    const event = await eventsService.getEventIfNotCancelled(ticket.eventId);
    //@ts-ignore
    const theLoggedInUserIsTheOwner = id == event.creatorId.toString();
    //@ts-ignore
    const theLoggedInUserIsTheTicketOwner = ticket.accountId.toString() == id;

    if (!theLoggedInUserIsTheOwner && !theLoggedInUserIsTheTicketOwner) {
      throw new Forbidden("You delete this persons ticket");
    }

    // @ts-ignore
    event.capacity += 1;
    event.save();
    await ticket.remove();
    return ticket;
  }
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Ticket.find({ eventId }).populate(
      "profile",
      "name picture"
    );
    return tickets;
  }

  async getTicketForEvent(eventId, accountId) {
    const ticket = await dbContext.Ticket.findOne({ eventId, accountId })
      .populate("account", "name picture")
      .populate("event", "name description coverImg");
    return ticket;
  }
}

export const ticketsService = new TicketsService();
