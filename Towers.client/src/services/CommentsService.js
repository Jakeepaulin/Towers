import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    AppState.comments = res.data;
    console.log(res.data);
  }
}

export const commentsService = new CommentsService();
