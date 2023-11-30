// store/index.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        flights: [],
        selectedFlight: {},
        promotion: false,
        selectedFlightPackage: {},
        userCount: 1,
    },
    mutations: {
        setFlights(state, value) {
            state.flights = value
        },
        setSelectedFlight(state, flight) {
            state.selectedFlight = flight
        },
        setPromotion(state, val) {
            state.promotion = val
        },

        sortFlightsByDeparture(state) {
            state.flights = state.flights.sort((flight1, flight2) => {
                const departureTime1 = new Date(`2000-01-01 ${flight1.departureDateTimeDisplay}`);
                const departureTime2 = new Date(`2000-01-01 ${flight2.departureDateTimeDisplay}`);

                // Compare departure times
                if (departureTime1 < departureTime2) return -1;
                if (departureTime1 > departureTime2) return 1;

                return 0;
            })
        },
        sortByPrice(state) {
            let flights = state.flights.sort((flight1, flight2) => {
                const ecoFlyPrice1 = flight1.fareCategories.ECONOMY.subcategories.find(
                    (subcat) => subcat.brandCode === "ecoFly"
                ).price.amount;

                const ecoFlyPrice2 = flight2.fareCategories.ECONOMY.subcategories.find(
                    (subcat) => subcat.brandCode === "ecoFly"
                ).price.amount;

                return ecoFlyPrice1 - ecoFlyPrice2;
            });

            state.flights = flights

        },
        setSelectedFlightPackage(state, val) {
            state.selectedFlightPackage = val
        },

        setUserCount(state, val) {
            state.userCount = val
        }
    },
    actions: {
        applyPromotion(context, state) {
            context.state.flights.forEach((flight) => {
                for (const category in flight.fareCategories) {
                    flight.fareCategories[category].subcategories.forEach(
                        (subcategory) => {
                            if (subcategory.brandCode === "ecoFly" && category === 'ECONOMY') {
                                subcategory.price.amount *= 0.5;
                            }
                        }
                    );
                }

            });

        },
        revertPromotion(context, state) {
            context.state.flights.forEach((flight) => {
                for (const category in flight.fareCategories) {
                    flight.fareCategories[category].subcategories.forEach(
                        (subcategory) => {
                            if (subcategory.brandCode === "ecoFly" && category === 'ECONOMY') {
                                subcategory.price.amount *= 2;
                            }
                        }
                    );
                }

            });

        }
    },
    getters: {
        flights(state) {
            return state.flights
        },
        selectedFlight(state) {
            return state.selectedFlight
        },
        getPromotion(state) {
            return state.promotion
        },

        getSelectedFlightPackage(state) {
            return state.selectedFlightPackage
        },
        getUserCount(state) {
            return state.userCount
        }
    },
});
