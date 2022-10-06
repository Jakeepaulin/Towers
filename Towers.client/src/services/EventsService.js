import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";
import { Event } from "../models/Event.js";
import { router } from "../router.js";

class EventsService {
  async getEvents(type = "") {
    let res;
    if (type) {
      res = await api.get("api/events", {
        params: {
          type: type,
        },
      });
    } else {
      const res = await api.get("api/events");
      console.log(res.data);
      AppState.events = res.data.map((e) => new Event(e));
    }
  }
  async getEventsById(id) {
    const res = await api.get(`api/events/${id}`);
    AppState.activeEvent = new Event(res.data);
  }

  async createEvent(eventData) {
    const res = await api.post(`api/events`, eventData);
    const event = new Event(res.data);
    AppState.events = [...AppState.events, event];
    AppState.activeEvent = event;
    router.push({ name: "Event", params: { id: event.id } });
  }

  async removeEvent(id) {
    const res = await api.delete(`api/events/${id}`);
    AppState.events = AppState.events.filter((e) => e.id != id);
    AppState.activeEvent = null;
    router.push({ name: "Home" });
  }
}

export const eventsService = new EventsService();
