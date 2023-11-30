<template>
  <div class="px-7 py-7 bg-gray-400/60 search-bg mx-auto">
    <div class="flex justify-between search-bar mx-auto">
      <v-select
        class="bg-white select-box"
        v-model="origin"
        :options="originAirports"
        ref="originSelect"
      >
      </v-select>

      <v-select
        class="bg-white select-box"
        v-model="destination"
        :options="destinationAirports"
        ref="destinationSelect"
      ></v-select>

      <div class="date bg-">Date</div>

      <div style="position: relative">
        <button
          ref="toogle-popover"
          @click="togglePopover"
          class="bg-blue-900 user-button"
        >
          <font-awesome-icon icon="person" style="color: #c2d4f5" />
          <div class="text-white">{{ userCount }}</div>
        </button>
        <div v-if="isOpen" class="popover-overlay p-4">
          <div>Kabin ve yolcu seçimi</div>
          <div class="flex justify-between">
            <div>
              <input type="radio" id="html" name="fav_language" value="HTML" />
              <label for="html">Economy</label><br />
            </div>
            <div>
              <input type="radio" id="html" name="fav_language" value="HTML" />
              <label for="html">Business</label><br />
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div v-if="isOpen" class="popover-content flex">
              <div class="flex gap-4 items-center">
                <button class="decrease" @click="decrease">-</button>
                <font-awesome-icon icon="person" style="color: #c2d4f5" />
                <button class="increase" @click="increase">+</button>
              </div>
            </div>
            <div>
              {{ userCount }}
            </div>
          </div>
        </div>
      </div>

      <button
        id="searchFlight"
        class="bg-red-500 search-button"
        @click="searchFlight"
      >
        <font-awesome-icon icon="chevron-right" style="color: #ffffff" />
      </button>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import flights from "../utils/flights.json";

export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      origin: {},
      destination: {},
      existFlights: flights.flights,
      date: null,
      isOpen: false,
      userCount: 1,
    };
  },

  computed: {
    originAirports() {
      return Array.from(
        new Set(this.existFlights.map((flight) => flight.originAirport.name))
      );
    },
    destinationAirports() {
      return Array.from(
        new Set(
          this.existFlights.map((flight) => flight.destinationAirport.name)
        )
      );
    },
  },
  mounted() {
    this.$store.commit("setPromotion", false);
    this.$store.commit("setFlights", []);
  },
  methods: {
    searchFlight() {
      const filteredFlights = this.existFlights
        .filter((flight) => {
          return (
            flight.destinationAirport.name === this.destination &&
            flight.originAirport.name === this.origin
          );
        })
        .sort((flight1, flight2) => {
          const ecoFlyPrice1 =
            flight1.fareCategories.ECONOMY.subcategories.find(
              (subcat) => subcat.brandCode === "ecoFly"
            ).price.amount;

          const ecoFlyPrice2 =
            flight2.fareCategories.ECONOMY.subcategories.find(
              (subcat) => subcat.brandCode === "ecoFly"
            ).price.amount;

          return ecoFlyPrice1 - ecoFlyPrice2;
        });

      this.$store.commit("setFlights", filteredFlights);

      if (!filteredFlights.length) {
        alert("Ucus bulunamadi.");
      } else {
        this.$router.push({ name: "SearchedFlights" });
      }
    },
    increase() {
      this.userCount++;

      this.$store.commit("setUserCount", this.userCount);
    },
    decrease() {
      if (this.userCount === 1) {
        return;
      }
      this.userCount--;
      this.$store.commit("setUserCount", this.userCount);
    },
    togglePopover() {
      this.isOpen = !this.isOpen;
    },
    closePopover() {
      this.isOpen = false;
    },
  },
};
</script>
