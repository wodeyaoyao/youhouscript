<template>
	<el-row
		class="bili-list-item"
		:gutter="20"
		@mouseenter="isShowFollowBtn = true"
		@mouseleave="isShowFollowBtn = false"
	>
		<el-col :span="3" class="bili-left-box">
			<e-link
				:href="`//space.bilibili.com/${follow.mid}`"
				:title="follow.uname"
			>
				<el-avatar :src="`${follow.face}`" :size="36"></el-avatar>
			</e-link>
		</el-col>
		<el-col :span="16" class="bili-center-box">
			<div class="bili-name-line">
				<e-link
					:href="`//space.bilibili.com/${follow.mid}`"
					:title="follow.uname"
				>
					{{ follow.uname }}
				</e-link>
				<span class="bili-publish-time" v-if="follow.video">
					{{ follow.video.created }}
				</span>
			</div>
			<div class="bili-content" v-if="follow.video">
				<e-link :href="`//www.bilibili.com/video/${follow.video.bvid}`">
					{{ follow.video.title }}
				</e-link>
			</div>
		</el-col>
		<el-col :span="5" class="bili-right-box">
			<e-button
				class="bili-unfollow"
				size="mini"
				:type="follow.isFollow ? 'danger' : 'primary'"
				v-show="isShowFollowBtn"
				@click="editFollow(follow)"
			>
				{{ follow.isFollow ? "取消关注" : "关注" }}
			</e-button>
		</el-col>
	</el-row>
</template>

<script setup>
import ELink from "../ELink/index.vue";
import EButton from "../EButton/index.vue";
import { changeFollow } from "../../apis";
import { defineProps, ref } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({ follow: Object });

const isShowFollowBtn = ref(false);

const editFollow = (follow) => {
	follow.isFollow
		? changeFollow(follow.mid).then((isSuccess) => {
				if (isSuccess) {
					ElMessage.success("取消关注成功");
					follow.isFollow = false;
				}
		  })
		: changeFollow(follow.mid, 1).then((isSuccess) => {
				if (isSuccess) {
					ElMessage.success("关注成功");
					follow.isFollow = true;
				}
		  });
};
</script>

<style scoped>
.bili-list-item {
	padding: 12px 20px;
	cursor: pointer;
}

.bili-list-item:hover {
	background: #f4f4f4;
}

.bili-name-line {
	font-size: 12px;
	color: #505050;
}

.bili-content {
	margin-top: 6px;
	font-size: 14px;
	color: #212121;
	font-weight: 500;
}

.bili-publish-time,
.bili-video-progress {
	margin-left: 10px;
	color: #999;
}
</style>
