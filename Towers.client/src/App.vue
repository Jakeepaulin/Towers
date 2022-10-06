<template>
  <main class="bg-dark">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10">
          <router-view />
        </div>
        <div class="col-md-2 p-0 sticky-top">
          <Navbar />
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Event</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form action="submit" class="card" @submit.prevent="createEvent()">
            <div class="card-body text-start">
              <div>
                <label for="name">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="editable.name"
                  required
                  name="name"
                />
              </div>
              <div>
                <label for="coverImg">Cover Image:</label>
                <input
                  type="url"
                  class="form-control"
                  v-model="editable.coverImg"
                  required
                  name="coverImg"
                  placeholder="coverImg"
                />
              </div>
              <div>
                <label for="location">Location:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="editable.location"
                  name="location"
                />
              </div>
              <div>
                <label for="startDate">Date:</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="editable.startDate"
                  name="startDate"
                />
              </div>
              <div>
                <label for="capacity">Capacity:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="editable.capacity"
                  name="capacity"
                />
              </div>

              <div>
                <label for="type">What type of event is this?</label>
                <select name="type" v-model="editable.type">
                  <option value="concert">Concert 🎸</option>
                  <option value="convention">Convention 👩‍💼</option>
                  <option value="sport">Sport 🏀</option>
                  <option value="digital">Tech 💻</option>
                </select>
              </div>
              <div>
                <label for="description">Description:</label>
                <textarea
                  type="text"
                  class="form-control"
                  v-model="editable.description"
                  name="description"
                  rows="8"
                  style="resize: none"
                ></textarea>
              </div>
              <div></div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Create this Event!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/Navbar.vue";
import { eventsService } from "./services/EventsService.js";
import Pop from "./utils/Pop.js";

export default {
  setup() {
    const editable = ref({
      event: {},
    });
    watchEffect(() => {
      editable.value = { ...AppState.post };
    });
    return {
      editable,
      appState: computed(() => AppState),
      async createEvent() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect();
          }
          await eventsService.createEvent(editable.value);
          editable.value = {
            event: {},
          };
        } catch (error) {
          Pop.error(error);
        }
      },
    };
  },
  components: { Navbar },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
