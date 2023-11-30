<template>
  <div class="status-page m-auto m-t-4">
    <div class="flex gap-4 my-10 items-center">
      <font-awesome-icon
        v-if="status"
        icon="circle-check"
        style="color: #49fb09"
        class="text-xl"
      />

      <font-awesome-icon
        v-else
        class="text-xl"
        icon="circle-xmark"
        style="color: #ff4000"
      />

      <div class="text-lg">
        Kabin seçiminiz
        {{ status ? "tamamlandı" : "tamamlanamadı." }}
      </div>
    </div>

    <hr />

    <div v-if="!status" class="text-right m-2">
      <button @click="start" class="bg-red-500 p-4 rounded text-white">
        Başa Dön
      </button>
    </div>
    <div v-else class="flex m-2 justify-between text-xl">
      <div>Toplam Tutar:</div>

      <div class="flex gap-4">
        <div class="text-blue">
          {{ selectedFlightPackage.price.currency }}
        </div>
        <div>{{ userCount * selectedFlightPackage.price.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("setFlights", []);
    this.$store.commit("setSelectedFlight", {});
    if (!this.selectedFlightPackage.price) {
      this.$router.push("/");
    }
  },
  computed: {
    selectedFlightPackage() {
      return this.$store.getters.getSelectedFlightPackage;
    },

    status() {
      if (this.selectedFlightPackage.status === "AVAILABLE") {
        return true;
      } else {
        return false;
      }
    },
    userCount() {
      return this.$store.getters.getUserCount;
    },
  },
  methods: {
    start() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.status-page {
  width: 950px;
  height: 100vh;
}
</style>
