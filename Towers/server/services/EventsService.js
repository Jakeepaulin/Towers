import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class EventsService {
  async editEvent(eventData, id, userInfo) {
    const event = await this.getEventById(id);
    // @ts-ignore
    if (event.creatorId.toString() != userInfo.id || event.isCanceled == true) {
      throw new Forbidden("No Editing Events That Ain`t Yours!");
    }

    // if (eventData.isCanceled == true) {
    //   throw new BadRequest(
    //     `This event is already cancelled, you can't edit it`
    //   );
    // }

    event.name = eventData.name || event.name;
    event.description = eventData.description || event.description;
    event.coverImg = eventData.coverImg || event.coverImg;
    event.location = eventData.location || event.location;
    event.capacity = eventData.capacity || event.capacity;
    event.startDate = eventData.startDate || event.startDate;
    event.type = eventData.type || event.type;

    await event.save();
    return event;
  }
  async cancelEvent(id, userInfo) {
    const event = await this.getEventById(id);
    // @ts-ignore
    if (event.creatorId.toString() != userInfo.id) {
      throw new Forbidden("No Deleting Events That Ain`t Yours");
    }
    event.isCanceled = true;
    await event.save();
    return event;
  }
  async getEventById(id) {
    const event = await dbContext.Event.findById(id).populate(
      "creator",
      "name picture"
    );
    if (!event) {
      throw new BadRequest("Invalid or Bad Album Id");
    }
    return event;
  }
  async getAllEvents(query) {
    const events = await dbContext.Event.find({
      isCancelled: false,
      ...query,
    }).populate("creator", "name picture");
    return events;
  }

  async createEvent(eventData) {
    const event = await dbContext.Event.create(eventData);
    if (eventData.startDate < new Date()) {
      throw new BadRequest("You Cannot create an event of the past");
    }
    await event.populate("creator", "name picture type");
    return event;
  }

  async getEventIfNotCancelled(eventId) {
    const event = await this.getEventById(eventId);
    if (event.isCanceled) {
      throw new BadRequest("The album is archived");
    }
    return event;
  }
}

export const eventsService = new EventsService();
