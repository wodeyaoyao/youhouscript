const getDom = (selector) =>
	new Promise((resolve, reject) => {
		let timer;
		let tryCount = 1;
		let dom = document.querySelector(selector);

		if (dom) {
			resolve(dom);
		} else {
			timer = setInterval(() => {
				/* if (tryCount > 10) {
					reject();
				} */

				dom = document.querySelector(selector);

				if (dom) {
					resolve(dom);
					clearInterval(timer);
				}

				tryCount++;
			}, 500);
		}
	});

const createRateIcon = (() => {
	const icon = document.createElement("div");
	icon.style.backgroundColor = "rgba(0,0,0,0.5)";
	icon.style.borderRadius = "4px";
	icon.style.padding = "4px 8px";
	icon.style.position = "absolute";
	icon.style.inset = "30px auto auto 50%";
	icon.style.transform = "translateX(-50%)";
	icon.style.zIndex = "999999";
	icon.style.color = "#fff";
	icon.style.fontSize = "18px";

	return (text = "三倍速快进中") => {
		icon.innerHTML = text;

		return icon;
	};
})();

// 2s不动隐藏鼠标
const hideMouse = () => {
	let player;
	let cursorTimer;

	const hide = () => {
		clearTimeout(cursorTimer);

		player.style.cursor = "default";

		cursorTimer = setTimeout(() => {
			player.style.cursor = "none";
			player.removeEventListener("mousemove", hide);
			player = null;
		}, 2000);
	};

	document.addEventListener("mousemove", async () => {
		if (!player) {
			player = await getDom(".u-edu-h5player-pcdisplay");
			player.addEventListener("mousemove", hide);
		}
	});
};

// 连按两次d三倍速快进，再按一次d恢复原先倍速
const beisu = () => {
	let keyDownCount = 0;
	let rate = 1;
	let keyDownTimer;
	let video, player;

	document.addEventListener("keydown", async (e) => {
		if (e.key === "d") {
			keyDownCount++;

			if (keyDownCount === 2) {
				clearTimeout(keyDownTimer);

				player = await getDom(".u-edu-h5player-pcdisplay");
				player.appendChild(createRateIcon());

				video = await getDom("video");

				rate = video.playbackRate;
				video.playbackRate = 3;
			} else if (keyDownCount > 2) {
				video.playbackRate = rate;
				player.removeChild(createRateIcon());
				keyDownCount = 0;
			} else {
				keyDownTimer = setTimeout(() => {
					keyDownCount = 0;
				}, 500);
			}
		}
	});
};

hideMouse();
beisu();
