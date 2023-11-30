<template>
  <div class="full-page bg-sky-900">
    <div class="mx-auto max-w-4xl text-center text-white py-20">
      <h1 class="main-title">Merhaba</h1>
      <h3 class="sub-title">Nereyi keşfetmek istersiniz?</h3>
    </div>
    <FindFlight></FindFlight>
  </div>
</template>

<script>
import FindFlight from "../components/FindFlight.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    FindFlight,
  },
});
</script>

<style scoped>
.full-page {
  height: 100vh;
}
</style>
