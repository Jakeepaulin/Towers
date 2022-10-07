<template>
  <div class="row">
    <div class="col-md-12 d-flex">
      <div class="text-center">
        <img
          :src="comment.creator?.picture"
          alt="Commenter"
          :title="comment.creator?.name"
          height="54"
          class="rounded my-2"
        />
        <p>{{ comment.creator?.name }}</p>
      </div>
      <p class="px-3 pt-4">{{ comment?.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
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
