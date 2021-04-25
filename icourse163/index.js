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

getDom(".u-edu-h5player-pcdisplay").then((player) => {
	// 2s不动隐藏鼠标
	let cursorTimer;
	player.addEventListener("mousemove", () => {
		clearTimeout(cursorTimer);

		player.style.cursor = "default";

		cursorTimer = setTimeout(() => {
			player.style.cursor = "none";
		}, 2000);
	});

	// 连按两次d三倍速快进，再按一次d恢复原先倍速
	let keyDownCount = 0;
	let keyDownTimer;
	let rate = 1;
	let video;
	document.addEventListener("keydown", async (e) => {
		if (e.key === "d") {
			keyDownCount++;

			if (keyDownCount === 2) {
				clearTimeout(keyDownTimer);
                
				player.appendChild(createRateIcon());

				if (!video) {
					video = await getDom("video");
				}

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
});