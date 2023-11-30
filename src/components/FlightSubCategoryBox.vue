<template>
  <div class="flight-category relative">
    <div class="">
      <div class="head flex justify-between bg-custom pt-3 pr-2 pl-2 pb-6">
        <div>
          {{ category.brandCode }}
        </div>
        <div class="flex">
          <span class="text-xs mb-8">
            <div>{{ category.price.currency }}</div>
          </span>
          <span>
            {{ category.price.amount }}
          </span>
        </div>
      </div>
      <div class="rights border-2 border-slate-300 border-b-0">
        <div
          v-for="right in category.rights"
          :key="right"
          class="border-slate-300 h-10 border-b-2 flex items-center p-1"
        >
          {{ right }}
        </div>
      </div>
      <button
        class="bg-red-500 text-white w-full absolute bottom-0 select-btn"
        @click="selectFlight"
        :disabled="
          (promotion && flightClass === 'BUSINESS') ||
          (promotion && category.brandCode !== 'ecoFly')
        "
        :class="{
          'disabled-btn':
            (promotion && flightClass === 'BUSINESS') ||
            (promotion && category.brandCode !== 'ecoFly'),
        }"
      >
        Uçuşu seç
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["category", "flightClass"],
  data() {
    return {};
  },
  computed: {
    promotion() {
      return this.$store.getters.getPromotion;
    },
  },
  methods: {
    selectFlight() {
      this.$store.commit("setSelectedFlightPackage", this.category);
      this.$router.push("/status");
    },
  },
};
</script>
