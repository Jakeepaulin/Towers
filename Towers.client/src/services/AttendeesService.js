import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`);
    AppState.tickets = res.data;
    // console.log(res.data);
  }

  async removeTicket(ticketId) {
    await api.delete(`api/tickets/${ticketId}`);
    AppState.tickets = AppState.tickets.filter((t) => t.id != ticketId);
    // console.log("You are Un-Attended");
  }

  async addTicket(eventData) {
    const res = await api.post(`api/tickets`, eventData);
    const ticket = res.data.profile;
    AppState.tickets.push(ticket);
    this.getTicketsByEventId();
  }
}

export const attendeesService = new AttendeesService();
