<template>
  <main class="bg-dark">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10">
          <router-view />
        </div>
        <div class="col-md-2 p-0">
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
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/Navbar.vue";

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
  components: { Navbar },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
