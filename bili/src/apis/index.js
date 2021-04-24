import { ElMessage } from "element-plus";
import { follow, followList, videoList } from "./apis";
import { xmlHttpRequest, Cookie } from "../utils/tools";

// 获取关注列表
export const fetchFollowList = () => {
	return xmlHttpRequest({
		method: "GET",
		url: followList,
		headers: {
			referer: "https://space.bilibili.com/44088778/fans/follow",
			"sec-fetch-dest": "script",
			"sec-fetch-mode": "no-cors",
			"sec-fetch-site": "same-site",
		},
	}).then((res) => res.data.list);
};

// 获取视频列表
export const fetchVideoList = (mid, count = 8) => {
	return xmlHttpRequest({
		method: "GET",
		url: videoList,
		data: { mid, count },
		headers: {
			referer: "https://space.bilibili.com/" + mid,
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site",
		},
	}).then((res) => res.data.list.vlist);
};

/**
 * 改变关注状态
 * @method changeFollow
 * @param {String} fid up主mid
 * @param {String} act 取消关注为2, 关注为1
 * @param {String} re_src
 * @param {String} jsonp 跨域方法
 * @param {String} csrf
 * @return {Array}
 */

export const changeFollow = (
	fid,
	act = 2,
	csrf = Cookie.get("bili_jct"),
	re_src = 11,
	jsonp = "jsonp"
) => {
	return xmlHttpRequest({
		method: "POST",
		url: follow,
		data: { fid, act, re_src, jsonp, csrf },
		headers: {
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site",
		},
	}).then((res) => {
		return res.code == 0;
	});
};
