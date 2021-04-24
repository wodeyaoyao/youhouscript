import { createApp } from "vue";
import { getDom } from "./utils/tools";
import App from "./App.vue";
import installElementPlus from "./plugins/element";
import "./global.css";

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
