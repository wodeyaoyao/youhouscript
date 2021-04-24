import { createApp } from "vue";
import App from "./App.vue";
import "./global.css";
import installElementPlus from "./plugins/element";
import { getDom } from "./utils/tools";

// 动态加载
getDom(".user-con.signin").then((userCon) => {
	const biliUpdate = document.createElement("div");
	biliUpdate.id = "bili-update";
	biliUpdate.classList.add("item");
	userCon.insertBefore(biliUpdate, userCon.childNodes[0]);

	const app = createApp(App);

	installElementPlus(app);

	app.mount("#bili-update");
});
