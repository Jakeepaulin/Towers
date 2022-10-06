<template>
  <div class="container-fluid">
    <!-- SECTION Top Card -->
    <div
      class="row p-0 backdrop rounded mt-4"
      :style="{ backgroundImage: `url(${event?.coverImg})` }"
    >
      <div class="col-md-12 opaque rounded">
        <div class="row py-3">
          <div class="col-md-5 d-flex align-text-center">
            <img :src="event?.coverImg" alt="" class="mini-pic rounded" />
          </div>
          <div class="col-md-7 d-flex flex-wrap justify-content-between">
            <div class="col-md-12">
              <h3>{{ event?.name }}</h3>
              <h6>{{ event?.location }}</h6>
              <h6>{{ event?.startDate }}</h6>
            </div>
            <div class="mt-5 col-md-12">
              <p>{{ event?.description }}</p>
            </div>
            <div
              v-if="event?.capacity >= 0"
              class="col-md-12 d-flex justify-content-between pe-2"
            >
              <p> Spots left: <div class="text-success">{{ event?.capacity }}</div></p>
              <button @click="addTicket()" class="btn btn-warning pe-3">
                Attend
              </button>
              <button @click="removeTicket()" class="btn btn-danger pe-3">
                Un-Attend
              </button>
            </div>
            <div v-else class="col-md-12 d-flex align-content-bottom">
              <h4 class="text-danger">Sold Out</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 bg-secondary rounded my-3">
        <div>{{ ticket.picture }}</div>
      </div>
    </div>
    <div class="row">
      <div>
        <form action="submit" @submit.prevent="createComment()">
          <label class="py-2" for="body">Comment:</label>
          <textarea
          type="text"
          class="form-control"
          v-model="editable.body"
          name="body"
          rows="4"
          style="resize: none"
          >
        </textarea>
        <div class="col-12 d-flex justify-content-end py-2">
          <button type="submit" class="btn btn-info text-end"> Add Comment</button>
        </div>
      </form>
      </div>
      <div class="col-md-12 bg-secondary my-3">
        <div>{{ comment }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { attendeesService } from "../services/AttendeesService.js";
import { AuthService } from "../services/AuthService.js";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({
      comment: {},
    });
    watchEffect(() => {
      editable.value = { ...AppState.post };
    });
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventsById(route.params.id);
      } catch (error) {
        Pop.error(error, "[GetEvent]");
      }
    }
    async function getTicketsByEventId() {
      try {
        await attendeesService.getTicketsByEventId(route.params.id);
      } catch (error) {
        Pop.error(error, "[GetTickets]");
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.id);
      } catch (error) {
        Pop.error(error, "[GetComments]");
      }
    }
    onMounted(() => {
      getEventById();
      getTicketsByEventId();
      getCommentsByEventId();
    });
    return {
      editable,
      // event: computed(() => AppState.events),
      account: computed(() => AppState.account),
      comment: computed(() => AppState.comments),
      event: computed(() => AppState.activeEvent),
      ticket: computed(() => AppState.tickets),
      async addTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect();
          }
          await attendeesService.addTicket({
            eventId: AppState.activeEvent.id || route.params.id,
          });
          Pop.success("Thanks for coming to our event!");
        } catch (error) {
          Pop.error(error);
        }
      },
      async removeTicket() {
        try {
          const yes = await Pop.confirm(
            "Are you sure you want to Un-Attend this event?"
          );
          if (!yes) {
            return;
          }
          const ticket = AppState.tickets.find(
            (t) =>
              t.accountId == AppState.account.id &&
              t.eventId == AppState.activeEvent.id
          );
          await attendeesService.removeTicket(ticket.id);
        } catch (error) {
          Pop.error(error);
        }
      },
      async createComment() {
        try {
          // if (!AppState.account.id) {
          //   return AuthService.loginWithRedirect();
          // }
          await commentsService.createComment(editable.value);
          editable.value = {
            comment: {},
          };
        } catch (error) {
          Pop.error(error);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  height: 50vh;
  background-size: cover;
  background-position: center;
}
.opaque {
  background-color: rgba(35, 34, 34, 0.631);
}
.mini-pic {
  max-width: 30vw;
}
</style>
