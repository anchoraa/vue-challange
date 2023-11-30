<template>
  <div>
    <div class="flex gap-4 p-4">
      <div class="flex w-9/12 bg-white p-4 justify-between custom-box-shadow">
        <div class="w-9/12 flex justify-between cursor-pointer">
          <div class="arrival-info">
            <div>{{ flight.arrivalDateTimeDisplay }}</div>
            <div>{{ flight.originAirport.code }}</div>
            <div>{{ flight.originAirport.city.name }}</div>
          </div>
          <hr class="road text-sky-900 m-auto" />
          <div class="departure-info">
            <div>{{ flight.departureDateTimeDisplay }}</div>
            <div>{{ flight.destinationAirport.code }}</div>
            <div>{{ flight.destinationAirport.city.name }}</div>
          </div>
        </div>
        <div class="w-2/12">
          <div>Uçuş Süresi</div>
          <div>{{ flight.flightDuration }}</div>
        </div>
      </div>
      <div
        v-for="category in categories"
        :key="category"
        class="
          w-3/12
          bg-white
          p-4
          hover:bg-slate-200
          cursor-pointer
          custom-box-shadow
        "
      >
        <div class="flex justify-between">
          <div class="flex text-xs items-center">
            <input
              @click="selectFlight(flight, category)"
              type="radio"
              id="category"
              name="category"
              value="category"
            />
            {{ category }}
          </div>
          <div class="text-xs">
            <div class="text-xs">Yolcu Başına</div>
            <div class="flex">
              <div class="text-sm">
                {{ price(category).amount }}
              </div>

              <div class="text-xs">
                {{ price(category).currency }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="flight === selectedFlightStore" class="p-4">
      <div class="flex gap-4 p-4 bg-white custom-box-shadow">
        <div
          v-for="s in selectedCategory.subcategories"
          :key="s"
          class="w-4/12"
        >
          <div class="sub-categories bg-white">
            <FlightSubCategoryBox
              :flightClass="cat"
              :category="s"
            ></FlightSubCategoryBox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FlightSubCategoryBox from "./FlightSubCategoryBox.vue";
export default {
  props: ["flight"],
  components: { FlightSubCategoryBox },
  computed: {
    categories() {
      return Object.keys(this.flight.fareCategories);
    },
    selectedFlightStore() {
      return this.$store.getters.selectedFlight;
    },

    promotion() {
      return this.$store.getters.getPromotion;
    },
  },
  data() {
    return {
      selectedCategory: "",
      selectedSubcategory: "",
      selectedFlight: "",
      cat: "",
    };
  },
  methods: {
    selectFlight(flight, category) {
      this.selectedFlight = flight;

      this.$store.commit("setSelectedFlight", flight);

      this.cat = category;

      this.selectedCategory = flight.fareCategories[category];
    },
    calcPrice(categorie, subCategorie) {
      return this.flight.categorie[this.selectedCategory].subcategories
        .filter(
          (subcategory) => subcategory.brandCode === this.selectedSubcategory
        )
        .map((subcategory) => subcategory.price)[0];
    },
    price(category) {
      return this.flight.fareCategories[category].subcategories.find((a) => {
        return a.brandCode === "ecoFly";
      }).price;
    },
  },
  watch: {
    selectedFlightStore: {
      handler(val, newVal) {
        if (newVal !== val) {
        }
      },
      deep: true,
    },
  },
};
</script>
