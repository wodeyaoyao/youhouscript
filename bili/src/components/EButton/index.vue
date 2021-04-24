<template>
	<transition name="bili-fade">
		<el-button
			class="el-button"
			:size="size"
			:type="type"
			@click="emit('click')"
		>
			<slot></slot>
		</el-button>
	</transition>
</template>

<script setup>
import { defineEmit, defineProps } from "vue";

const props = defineProps({
	size: String,
	type: String,
});
const emit = defineEmit(["click"]);
</script>

<style scoped></style>
