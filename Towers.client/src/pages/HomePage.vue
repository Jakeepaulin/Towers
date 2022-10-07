<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div class="d-flex flex-column align-items-center">
            <img alt="logo" src="../assets/img/cw-logo.png" height="45" />
          </div>
        </router-link>
      </div>
      <div class="col-md-12">
        <div class="short rounded">
          <img
            src="https://s3-alpha-sig.figma.com/img/cd1b/eb35/3224c652f40c0754047c232b09e71cc3?Expires=1665964800&Signature=Y5NaOeUpygAn2NQXwdOwA~JwHuvO1WZo22uJ1TWXSAHfnwvSNVthFoJbKp0xoRGNNdbmmFIQ6eJBkmisrKHT12AWRRHeLnU9xOtS1oAw3wCVAv06Pssj9QulPoesDz~qaL06MMi7aDQs7GN0zRfYLtTPSTAi4DUINfxKjb7SzA4nB54sl-gcb91bHkaU0X7pCrI6T8iiCbsFjXrelJROdprXXamlgZRgPHSaf1pYstnKrigqTolepjfbO5ZoWTHmAdMCuiY2ka5HfseMPhq-dKDG2hIM-txXqFnvt6vSA6NEwlo96Fy~1XgOV1xqOlqZqAQ5I~7Ei0YWPAZRZdu5iA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
            class="img-fluid image-view"
          />
          <div class="card-body"></div>
        </div>
      </div>
      <div class="col-md-12 d-flex justify-content-around py-1">
        <button @click="getEventsByType('')" class="btn btn-outline-success">
          All Events
        </button>
        <button
          @click="getEventsByType('convention')"
          class="btn btn-outline-success"
        >
          Conventions
        </button>
        <button
          @click="getEventsByType('sport')"
          class="btn btn-outline-success"
        >
          Sports
        </button>
        <button
          @click="getEventsByType('concert')"
          class="btn btn-outline-success"
        >
          Music
        </button>
        <button
          @click="getEventsByType('digital')"
          class="btn btn-outline-success"
        >
          Tech
        </button>
      </div>
      <div class="row">
        <event-card v-for="e in events" :key="e.id" :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import EventCard from "../components/EventCard.vue";

export default {
  setup() {
    const editable = ref({});

    async function getEvents() {
      try {
        await eventsService.getEvents();
      } catch (error) {
        Pop.error(error);
      }
    }

    onMounted(() => {
      getEvents();
    });
    return {
      editable,
      events: computed(
        () => AppState.events
        // .filter((e) =>
        // a.name.toUpperCase().includes(editable.value.toUpperCase())
        // )
      ),
      async getEventsByType(type) {
        try {
          await eventsService.getEvents(type);
        } catch (error) {
          Pop.error(error);
        }
      },
    };
  },
  components: { EventCard },
};
</script>

<style scoped lang="scss">
.short {
  height: 20vh;
  overflow: hidden;
  img {
    object-position: bottom;
    object-fit: cover;
  }
}
</style>
