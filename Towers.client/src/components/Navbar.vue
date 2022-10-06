<template>
  <nav class="navbar navbar long color align-content-start sticky-top">
    <div class="container-fluid justify-content-center">
      <div class="row py-3">
        <Login />
        <router-link
          :to="{ name: 'Home' }"
          class="btn text-success lighten-30 selectable text-uppercase"
        >
          Home
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Login from "./Login.vue";
export default {
  setup() {
    return {};
  },
  components: { Login },
};
</script>

<style scoped>
.long {
  height: 100vh;
}
.color {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0.619) 0%,
    rgba(71, 76, 97, 1) 100%
  );
}
</style>
