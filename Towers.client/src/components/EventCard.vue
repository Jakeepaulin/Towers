<template>
  <div class="col-md-3 my-2">
    <router-link :to="{ name: 'Event', params: { id: event.id } }">
      <div
        class="card elevation-1"
        :style="{ backgroundImage: `url(${event.coverImg})` }"
      >
        <div class="card-body"></div>
        <div class="card-footer d-flex flex-wrap align-content-start pt-2">
          <h5 class="text-start text-shadow mb-2">{{ event.name }}</h5>
          <div class="text-light" v-if="event?.isCanceled == false">
            <p class="m-0">{{ event.location }}</p>
            <p class="m-0">{{ event.startDate }}</p>
          </div>
          <div v-else>
            <h3 class="text-danger">This event has been canceled</h3>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { Event } from "../models/Event.js";

export default {
  props: {
    event: { type: Event, required: true },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.background-image {
  background-position: center;
  background-size: contain;
}
.text-shadow {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px salmon;
  font-weight: bold;
  letter-spacing: 0.08rem;
}
.card {
  height: 30vh;
}
.card-footer {
  height: 16vh;
  background-color: rgba(128, 128, 128, 0.473);
}
</style>
