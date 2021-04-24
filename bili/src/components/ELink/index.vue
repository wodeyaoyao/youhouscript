<template>
	<el-link :href="href" :underline="underline">
		<slot></slot>
	</el-link>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
	href: String,
	underline: {
		default: false,
	},
});
</script>

<style></style>
