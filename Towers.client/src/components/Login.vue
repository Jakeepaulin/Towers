<template>
  <span class="navbar-text justify-content-center text-center">
    <button
      class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>

    <div class="dropdown my-2 my-lg-0" v-else>
      <div
        class="dropdown-toggle selectable"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="authDropdown"
      >
        <div
          class="d-flex flex-wrap align-items-center justify-content-center gap-3"
          v-if="account.picture || user.picture"
        >
          <div class="col-md-12">
            <img
              :src="account.picture || user.picture"
              alt="account photo"
              height="40"
              class="rounded"
            />
          </div>
          <div class="col-md-12">
            <router-link
              :to="{ name: 'Account' }"
              class="btn text-success lighten-30 selectable text-uppercase"
            >
              Account
            </router-link>
          </div>
          <!-- NOTE this is where you are creating your events -->
          <div class="col-md-12">
            <button
              class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
              @click="createNewEvent()"
            >
              New Event
            </button>
          </div>
          <!-- <span class="mx-3 text-success lighten-30">{{
            account.name || user.name
          }}</span> -->
        </div>
      </div>
      <div
        class="dropdown-menu p-0 list-group w-100"
        aria-labelledby="authDropdown"
      >
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Manage Account
          </div>
        </router-link>
        <div
          class="list-group-item list-group-item-action hoverable text-danger"
          @click="logout"
        >
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}
</style>
