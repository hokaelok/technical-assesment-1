<template>
	<button :class="buttonClasses" class="rounded-md px-10 h-[2rem] P-medium">
		{{ text }}
	</button>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
	color: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});

const buttonClasses = computed(() => [
	props.color === "red" ? "bg-[#FF1A50]" : "border-2",
	props.color === "red" ? "text-white" : "text-black",
]);
</script>
