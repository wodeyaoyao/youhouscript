const $ = (selectors) => {
	return document.querySelector(selectors);
};

const interval = (fn, ms, immediate) => {
	immediate && fn("");
	const timer = setInterval(() => fn(timer), ms);
};

const getDom = (selector, ms = 500) => {
	let dom = $(selector);

	return new Promise((resolve) => {
		interval(
			(timer) => {
				dom = $(selector);
				if (dom) {
					clearInterval(timer);
					resolve(dom);
				}
			},
			ms,
			true
		);
	});
};

const getClipboard = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(navigator.clipboard.readText());
		});
	});
};

const addEnterListener = (selector, fn, isRemove) => {
	const dom = typeof selectors === "string" ? $(selector) : selector;

	const func = (e) => {
		switch (e.keyCode) {
			case 13:
				fn(e);
				isRemove && dom.removeEventListener("keypress", func);
		}
	};

	dom.addEventListener("keypress", func);
};

const isStartsWith = (str, starts) => {
	const isStart = false;

	starts.forEach((item) => {
		item === str && (isStart = true);
		return;
	});

	return isStart;
};

const bindDownloadButton = async () => {
	const downloadButton = await getDom(".g-button[title=离线下载]");
	downloadButton.click();
};

const bindNewDownloadButton = async () => {
	const newDownloadButton = await getDom("#_disk_id_2");
	newDownloadButton.click();

	(await getDom("#share-offline-link")).focus();
};

const bindlinkInput = async () => {
	const linkInput = await getDom("#share-offline-link");

	linkInput.addEventListener("focus", async () => {
		const text = await getClipboard();
		if (/magnet\:\?xt=urn\:btih:.+/.test(text)) {
			linkInput.value = text;
		}
	});
	addEnterListener(linkInput, () => $(".g-button[title=确定]").click());

	linkInput.blur();
	linkInput.focus();
};

const bindStartDownload = async () => {
	const startDownloadButton = await getDom(".g-button[title=开始下载]");

	addEnterListener(document, () => startDownloadButton.click(), true);
};

(async () => {
	let text = ""; // 记录剪切板文字

	document.body.onfocus = async () => {
		document.createElement("input").focus();

		const cText = await getClipboard();
		if (text != cText && /magnet\:\?xt=urn\:btih:.+/.test(cText)) {
			text = cText;

			await bindDownloadButton();
			await bindNewDownloadButton();
		}
	};

	bindlinkInput();
	bindStartDownload();
})();
