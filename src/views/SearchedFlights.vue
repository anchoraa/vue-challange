<template>
  <div class="full-page">
    <FlightsList></FlightsList>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import FlightsList from "../components/FlightsList.vue";
export default defineComponent({
  components: { FlightsList },
  mounted() {},
});
</script>

<style scoped>
.full-page {
  height: 100vh;
}
</style>
