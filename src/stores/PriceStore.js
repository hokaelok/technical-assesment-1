import { defineStore } from "pinia";

import { ref } from "vue";

export const usePriceStore = defineStore("priceStore", {
	state: () => ({
		priceData: [],
		currentPageUpper: 0,
		currentPageLower: 10,
	}),
	getters: {
		allPriceData: (state) => state.priceData,
		getUpperPaginate: (state) => state.currentPageUpper,
		getLowerPaginate: (state) => state.currentPageLower,
	},
	actions: {
		async getPriceApi() {
			const response = await fetch(
				"http://13.212.255.177/api/priceData/technical-test"
			);

			const data = await response.json();

			// console.log(data);
			return data;
		},
		setPaginate(upper, lower) {
			this.currentPageUpper = upper;
			this.currentPageLower = lower;
		},
	},
});
