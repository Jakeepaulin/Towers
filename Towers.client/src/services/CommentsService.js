import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    AppState.comments = res.data;
    console.log(res.data);
  }

  async createComment(commentData) {
    const res = await api.post("api/comments", commentData);
    const comment = new Comment(res.data);
    AppState.comments = [comment, ...AppState.comments];
  }
}

export const commentsService = new CommentsService();
