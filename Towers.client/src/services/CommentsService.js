import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    AppState.comments = res.data;
    // console.log(res.data);
  }

  async createComment(commentData) {
    const res = await api.post("api/comments", commentData);
    // console.log(res.data);
    const comment = new Comment(res.data);
    AppState.comments.push(comment);
    // console.log(AppState.comments);
  }

  async removeComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`);
    AppState.comments = AppState.comments.filter((c) => c.id != commentId);
    // console.log("Your Comment has been removed");
  }
}

export const commentsService = new CommentsService();
