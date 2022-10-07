<template>
  <div class="row">
    <div class="col-md-12">
      <img
        :src="ticket.profile?.picture"
        alt="Profile picture of attendees"
        :title="ticket.profile?.name"
        height="54"
        class="rounded my-2"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
