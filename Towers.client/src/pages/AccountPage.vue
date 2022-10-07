<template>
  <div class="about text-center">
    <h1 class="pt-4">Hello {{ account.name }}!</h1>

    <div>
      <div
        class="d-flex flex-wrap gap-5 p-5 align-items-center justify-content-center"
      >
        <div class="col-12 text-center p-0">
          <h5 class="text-success">Here are the events you're attending:</h5>
        </div>
        <EventCard v-for="e in myEvents" :key="e.id" :event="e.event" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import EventCard from "../components/EventCard.vue";
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    async function getMyEvents() {
      try {
        await accountService.getMyEvents();
      } catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      getMyEvents();
    });
    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myEvents),
    };
  },
  components: { EventCard },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
