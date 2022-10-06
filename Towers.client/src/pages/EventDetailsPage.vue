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
              <p>Capacity:{{ event?.capacity }}</p>
              <button class="btn btn-warning pe-3">Attend</button>
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
        <div>{{ ticket }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 bg-secondary my-3"></div>
      <div>
        <label for="body">Comment:</label>
        <textarea
          type="text"
          class="form-control"
          v-model="editable.body"
          name="body"
          rows="8"
          style="resize: none"
        ></textarea>
        <!-- NOTE put button for submission here -->
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
        Pop.error(error, "[GetAlbum]");
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
