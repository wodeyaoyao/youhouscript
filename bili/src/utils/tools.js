import { ElNotification } from "element-plus";

// 获取相对于当前时间的表现形式
export const getDateDiff = (dateTimeStamp) => {
	dateTimeStamp = Number(dateTimeStamp);
	if (Number.isNaN(dateTimeStamp) || !Number) {
		return;
	}
	const now = new Date();
	const time = new Date(dateTimeStamp);

	const diffTime = (now - time) / 1000;

	const minC = diffTime / 60;
	const hourC = minC / 60;
	const dayC = hourC / 24;
	const monthC = dayC / 30;

	let result = "";

	if (monthC >= 1) {
		result = parseInt(monthC) + "月前";
	} else if (dayC >= 1) {
		result = parseInt(dayC) + "天前";
	} else if (hourC >= 1) {
		result = parseInt(hourC) + "小时前";
	} else if (minC >= 1) {
		result = parseInt(minC) + "分钟前";
	} else {
		result = "刚刚";
	}

	return result;
};

// http请求
export const xmlHttpRequest = ({
	url,
	method = "GET",
	data = {},
	headers = {},
	responseType = "json",
}) => {
	// 替换${}

	Object.keys(data).forEach((key) => {
		url = url.replace(new RegExp(`\\$\\{${key}\\}`, "g"), data[key] || "");
	});

	const strData =
		data &&
		Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join("&");

	return new Promise((resolve, reject) => {
		GM_xmlhttpRequest({
			method,
			url,
			data: strData,
			headers,
			onload: (res) => {
				res =
					responseType === "json"
						? JSON.parse(res.response)
						: res.response;
				if (res.code != 0 && res.responseType === "json") {
					reject(res);
				}
				resolve(res);
			},
			onerror: (err) => {
				console.error(err);
				ElNotification.error({ showClose: false });
				reject({ code: -1, message: err });
			},
		});
	});
};

/**
 * 循环获取dom节点
 * @method getDom
 * @param {String} selector
 * @param {Number} ms 每次尝试间隔时间
 * @param {Number} count 尝试次数
 * @return {Promise} JQuery节点
 */
export const getDom = (selector, isAll = false, count = 10, ms = 500) => {
	let dom = isAll
		? document.querySelectorAll(selector)
		: document.querySelector(selector);
	count--;
	return new Promise((resolve, reject) => {
		if (isAll ? dom.length : dom) {
			resolve(dom);
		}
		const timer = setInterval(() => {
			if (isAll ? dom.length : dom) {
				clearInterval(timer);
				resolve(dom);
			}
			if (count <= 0) {
				clearInterval(timer);
				reject();
			}
			dom = isAll
				? document.querySelectorAll(selector)
				: document.querySelector(selector);
			count--;
		}, ms);
	});
};

export const Cookie = {
	get(key) {
		const name = key + "=";
		var ca = document.cookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			const c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	},
};
