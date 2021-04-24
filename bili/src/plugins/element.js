import {
	ElAvatar,
	ElButton,
	ElCol,
	ElLink,
	ElLoading,
	ElPopover,
	ElRow,
	ElScrollbar,
	ElSkeleton,
	ElSkeletonItem
} from "element-plus";
// fade/zoom 等
import "element-plus/lib/theme-chalk/base.css";


export default (app) => {
	app.use(ElPopover)
		.use(ElButton)
		.use(ElLoading)
		.use(ElLink)
		.use(ElSkeleton)
		.use(ElSkeletonItem)
		.use(ElRow)
		.use(ElCol)
		.use(ElAvatar)
		.use(ElScrollbar);
};
