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
        <div class="card short">
          <img
            src="https://s3-alpha-sig.figma.com/img/cd1b/eb35/3224c652f40c0754047c232b09e71cc3?Expires=1665964800&Signature=Y5NaOeUpygAn2NQXwdOwA~JwHuvO1WZo22uJ1TWXSAHfnwvSNVthFoJbKp0xoRGNNdbmmFIQ6eJBkmisrKHT12AWRRHeLnU9xOtS1oAw3wCVAv06Pssj9QulPoesDz~qaL06MMi7aDQs7GN0zRfYLtTPSTAi4DUINfxKjb7SzA4nB54sl-gcb91bHkaU0X7pCrI6T8iiCbsFjXrelJROdprXXamlgZRgPHSaf1pYstnKrigqTolepjfbO5ZoWTHmAdMCuiY2ka5HfseMPhq-dKDG2hIM-txXqFnvt6vSA6NEwlo96Fy~1XgOV1xqOlqZqAQ5I~7Ei0YWPAZRZdu5iA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
            class=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.short {
  height: 20vh;
}
</style>
