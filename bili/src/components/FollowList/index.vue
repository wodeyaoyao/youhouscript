<template>
	<el-skeleton :loading="loading" animated :count="5">
		<template #template>
			<el-row :gutter="20" style="padding: 12px 20px">
				<el-col :span="3">
					<el-skeleton-item
						variant="image"
						style="width: 36px; height: 36px; border-radius: 50%"
					></el-skeleton-item>
				</el-col>
				<el-col :span="16">
					<div>
						<el-skeleton-item
							variant="text"
							style="width: 30%"
						></el-skeleton-item>
						<el-skeleton-item
							variant="text"
							style="width: 30%; margin-left: 10px"
						></el-skeleton-item>
					</div>
					<div>
						<el-skeleton-item
							variant="text"
							style="margin-top:6px;height: 36px"
						></el-skeleton-item>
					</div>
				</el-col>
			</el-row>
		</template>
		<template #default>
			<follow-list-item
				v-for="follow in modelValue"
				:key="follow.uid"
				:follow="follow"
			></follow-list-item>
		</template>
	</el-skeleton>
</template>

<script setup>
import { defineProps } from "vue";
import FollowListItem from "../FollowListItem/index.vue";

const props = defineProps({
	modelValue: { type: Array, default: () => [] },
	loading: Boolean,
});
</script>
