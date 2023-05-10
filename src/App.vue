<script setup>
import { computed, ref, watch } from "vue";
import { usePriceStore } from "./stores/PriceStore";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import BaseCard from "./components/BaseComponents/BaseCard.vue";
import TopNav from "./components/BaseComponents/Navigation/TopNav.vue";
import Paginate from "vuejs-paginate-next";

const priceStore = usePriceStore();
const prices = ref([]);
const brandImages = ref([
	"src/assets/brands/brands1.png",
	"src/assets/brands/brands2.png",
	"src/assets/brands/brands3.png",
	"src/assets/brands/brands4.png",
	"src/assets/brands/brands5.png",
	"src/assets/brands/brands6.png",
	"src/assets/brands/brands7.png",
]);
const popularInstruments = ref([
	{
		img: "src/assets/icon/forex.png",
		title: "Forex",
		body: "Trade over 100 currency pairs, including the majors, minors and exotics, with ultra-low spreads and fast execution.",
	},
	{
		img: "src/assets/icon/gold.png",
		title: "Precious Metals",
		body: "Speculate on the price movements of Gold and Silver against the US Dollar and diversify your trading portfolio.",
	},
	{
		img: "src/assets/icon/stock.png",
		title: "Stocks",
		body: "Get access to major international stocks (Apple, Google, Tesla) with no commissions or requotes and no hidden mark-ups.",
	},
	{
		img: "src/assets/icon/energy.png",
		title: "Energies",
		body: "Trade CFDs on spot energies such as Brent oil and natural gas with no commissions or requotes and no hidden mark-ups.",
	},
	{
		img: "src/assets/icon/indices.png",
		title: "Stock Indices",
		body: "Get access to major international stock indices (S&P 500, Nasdaq 100) with no commissions or requotes and no hidden mark-ups.",
	},
	{
		img: "src/assets/icon/crypto.png",
		title: "Cryptocurrencies",
		body: "Trade the new era of currencies such as Bitcoin, Etherium and Litecoin with ultra-low spreads and fast execution.",
	},
	{
		img: "src/assets/icon/wheat.png",
		title: "Commodities",
		body: "Trade over a vast variety of commodities (Cotton, Cocoa, Wheat) with ultra-low spreads and fast execution.",
	},
]);
const searchQuery = ref("");
const currentPageLower = ref(0);
const currentPageupper = ref(0);

const changePaginate = (pageNum) => {
	let currentPage = pageNum - 1;
	currentPageLower.value = currentPage * 10;
	currentPageupper.value = currentPage * 10 + 10;
	priceStore.setPaginate(currentPage * 10, currentPage * 10 + 10);
	console.log(priceStore.getUpperPaginate);
	console.log(priceStore.getLowerPaginate);
};

setInterval(() => {
	priceStore.getPriceApi().then((data) => {
		prices.value = data;
	});
}, 1000);

const filteredPrices = computed(() => {
	return prices.value.filter((price) => {
		return price.Symbol.toLowerCase().includes(
			searchQuery.value.toLowerCase()
		);
	});
});

watch(searchQuery, () => {
	filteredPrices.value;
});
</script>

<template>
	<TopNav />
	<section class="relative px-20 py-10">
		<BaseCard
			class="flex flex-col text-left gap-10 w-4/6 h-[23rem] lg:h-[20rem] px-[5rem] py-[4rem] object-cover bg-[url('./assets/images-2.jpg')]"
		>
			<h1 class="header-title w-[30rem] leading-[4rem]">
				Invest Better Together
			</h1>
			<h2 class="w-[20rem] text-justify">
				Combining A Transparent Trading Environment With The Best
				Pricing
			</h2>
		</BaseCard>
		<BaseCard
			class="absolute right-[10%] top-[75px] w-2/6 h-4/6 object-cover bg-[url('./assets/images-1.jpg')]"
		>
		</BaseCard>
	</section>
	<section class="flex gap-10 px-20 py-5">
		<div v-for="brandImage in brandImages" :key="brandImage">
			<img :src="brandImage" alt="" />
		</div>
	</section>
	<section class="px-20 py-5 flex flex-col gap-5">
		<div class="ml-[5rem] flex flex-col gap-3">
			<h2 class="text-[#FF1A50]">Access To The Most</h2>
			<h1 class="">POPULAR INSTRUMENTS</h1>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
			<div
				v-for="instrument in popularInstruments"
				:key="instrument.title"
				class="flex gap-5 items-center"
			>
				<img :src="instrument.img" alt="" />
				<div class="flex flex-col gap-3">
					<p class="H3-bold">{{ instrument.title }}</p>
					<p class="P-medium">
						{{ instrument.body }}
					</p>
				</div>
			</div>
		</div>
	</section>
	<section class="flex flex-col gap-5 justify-center py-5 px-20">
		<div>
			<div class="flex flex-col gap-3 mb-10">
				<p class="text-[#FF1A50] text-xl">Make Your Move</p>
				<p class="text-3xl font-semibold">
					Trade Over 500 Global Markets.
				</p>
			</div>
			<div>
				<p class="text-xl">
					We Offer Two Levels Of Pricing Depending On Your Account
					Tier
				</p>
				<input
					type="search"
					name="searchBar"
					id="searchBar"
					class="border-2 border-black"
					v-model="searchQuery"
				/>
				<table class="table-fixed w-4/5 border-2 border-blue-400">
					<thead>
						<tr class="text-left border-2 border-green-400">
							<th>NAME</th>
							<th>BUY</th>
							<th>SELL</th>
							<th>SREAD</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="price in filteredPrices.slice(0, 10)"
							:key="price"
						>
							<td>{{ price.Symbol }}</td>
							<td>{{ price.Ask }}</td>
							<td>{{ price.Bid }}</td>
							<td>{{ price.Spread }}</td>
						</tr>
					</tbody>
				</table>
				{{}}
				<paginate
					:pageCount="Math.ceil(prices.length / 10)"
					:clickHandler="changePaginate"
					:prevText="'Prev'"
					:nextText="'Next'"
					:containerClass="'className'"
				/>
			</div>
		</div>
		<div></div>
	</section>

	<hr />
</template>

<style scoped></style>
