<template>
  <div v-if="selectedFlightInfo" class="flights m-auto m-t-4">
    <div>Ucus</div>
    {{ selectedFlightInfo.from }} - {{ selectedFlightInfo.to }}
    {{ passangerCount }} Yolcu

    <div class="flex gap-x-8">
      <div>Promosyon Kodu</div>
      <div>
        <label class="switch">
          <input v-model="promotion" type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div>
      Promosyon kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini %50
      indirimle satın alabilirsiniz!
    </div>

    <div>
      Promosyon kodu seçeneği aktifken Eko Fly paketi haricinde seçim
      yapılamamaktadır.
    </div>
    <div class="flights-box">
      <div
        class="
          bg-blue-950
          text-white
          flex
          align-right
          p-4
          gap-3
          items-center
          text-right
        "
      >
        <div>Sıralama Kriteri</div>
        <div>
          <button
            @click="sortByPrice"
            class="border-solid border-2 rounded border-white p-2"
          >
            Ekonomi Ücreti
          </button>
        </div>
        <div>
          <button
            @click="sortByDeparture"
            class="border-solid border-2 rounded border-white p-2"
          >
            Kalkış Saati
          </button>
        </div>
      </div>
      <FlightRow
        :flight="flight"
        :key="flight"
        v-for="flight in flights"
      ></FlightRow>
    </div>
  </div>
</template>
<script>
import FlightRow from "./FlightRow.vue";
export default {
  components: {
    FlightRow,
  },
  computed: {
    flights() {
      return this.$store.getters.flights;
    },
    selectedFlightInfo() {
      const info = this.$store.getters.flights.map((flight) => {
        const originCity = flight.originAirport.city.name;
        const destinationCity = flight.destinationAirport.city.name;

        return { from: originCity, to: destinationCity };
      });
      const uniqueFlights = Array.from(new Set(info.map(JSON.stringify))).map(
        JSON.parse
      );
      return uniqueFlights[0];
    },
    passangerCount() {
      return this.$store.getters.getUserCount;
    },

    promotionApplied() {
      return this.$store.getters.getPromotion;
    },
  },
  data() {
    return {
      promotion: this.promotionApplied,
    };
  },
  methods: {
    sortByPrice() {
      this.$store.commit("sortByPrice");
    },
    sortByDeparture() {
      this.$store.commit("sortFlightsByDeparture");
    },
  },

  mounted() {
    if (!this.flights.length) {
      this.$router.push({ name: "Index" });
    }
  },
  watch: {
    promotion(val) {
      this.$store.commit("setPromotion", val);
      if (val) {
        this.$store.dispatch("applyPromotion");
      } else {
        this.$store.dispatch("revertPromotion");
      }
    },

    flights(val) {},
  },
};
</script>

<style scoped>
.flights {
  width: 950px;
}

.flights-box {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
  background-color: #f4f6f8;
}
</style>
