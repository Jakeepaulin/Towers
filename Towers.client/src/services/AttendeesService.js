import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`);
    AppState.tickets = res.data;
    console.log(res.data);
  }

  async removeTicket(ticketId) {
    await api.delete(`api/tickets/${ticketId}`);
    AppState.tickets = AppState.tickets.filter((t) => t.id != ticketId);
  }

  async addTicket(eventData) {
    const res = await api.post(`api/tickets`, eventData);
    const ticket = res.data;
    AppState.tickets.push(ticket);
  }
}

export const attendeesService = new AttendeesService();
