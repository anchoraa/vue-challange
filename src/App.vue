<script>
import Header from "./components/Header.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Header,
  },
});
</script>

<template>
  <Header></Header>
  <router-view></router-view>
</template>

<style scoped></style>
