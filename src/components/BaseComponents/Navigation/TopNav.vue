<template>
	<div>
		<div
			class="flex px-20 py-5 justify-between items-center border-b-2 border-gray-200"
		>
			<h1 class="">LOGO</h1>
			<div class="flex justify-end gap-5">
				<BaseButton color="white" text="Demo" />
				<BaseButton color="white" text="Login" />
				<BaseButton color="red" text="Sign up" />
			</div>
		</div>
		<div
			class="grid grid-cols-3 lg:flex lg:justify-center m-auto gap-10 py-2 navbar-menu"
		>
			<button v-for="btnText in topnavBtnTexts" :key="btnText" class="">
				{{ btnText }}
			</button>
		</div>
	</div>
</template>

<script setup>
import BaseButton from "../BaseButton.vue";

const topnavBtnTexts = [
	"Trading",
	"Platforms",
	"Clients Tools",
	"Promotions",
	"Research",
	"Partnerships",
	"About Us",
];
</script>

<style lang="scss" scoped></style>
