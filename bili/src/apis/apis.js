// 关注列表
export const followList =
	"https://api.bilibili.com/x/relation/followings?vmid=44088778&pn=1&ps=20&order=desc&jsonp=jsonp";

// 视频列表
export const videoList =
	"https://api.bilibili.com/x/space/arc/search?mid=${mid}&pn=1&ps=${count}&jsonp=jsonp";

// 关注操作
export const follow =
	"https://api.bilibili.com/x/relation/modify?fid=${fid}&act=${act}&re_src=${re_src}&jsonp=${jsonp}&csrf=${csrf}";
