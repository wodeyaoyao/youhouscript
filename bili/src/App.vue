<template>
	<el-popover
		:width="462"
		trigger="hover"
		popper-class="bili-container"
		@show="showUpdate"
	>
		<template #reference>
			<span class="name">更新</span>
		</template>
		<el-scrollbar style="height: 450px">
			<div class="bili-list-container">
				<follow-list
					v-model="followList"
					:loading="isLoading"
				></follow-list>
			</div>
		</el-scrollbar>
	</el-popover>
</template>

<script setup>
import { ref } from "vue";
import FollowList from "./components/FollowList/index.vue";
import { fetchFollowList, fetchVideoList } from "./apis";
import { getDateDiff } from "./utils/tools";

const followList = ref([]);
const isLoading = ref(false);

const showUpdate = async () => {
	isLoading.value = true;

	let list = followList.value;
	followList.value = [];

	if (!list.length) {
		list = (await fetchFollowList()).map((follow) => {
			follow.isFollow = true;

			return follow;
		});
	}

	const videos = await Promise.all(
		list.map((follow) => fetchVideoList(follow.mid, 1))
	);

	list = list
		.map((follow, index) => {
			follow.video = videos[index].map((video) => {
				video.createdNumber = video.created;
				video.created = getDateDiff(video.created * 1000);

				return video;
			})[0];

			return follow;
		})
		.sort((a, b) => b.video.createdNumber - a.video.createdNumber);

	followList.value = list;

	isLoading.value = false;
};
</script>

<style>
.bili-container {
	max-height: 474px;
	line-height: 18px !important;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px !important;
	border-radius: 2px !important;
	padding: 0 !important;
	overscroll-behavior: none;
}
</style>

<style scoped>
.bili-list-container {
	padding: 12px;
}
</style>
