import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "柒拾兆字节",
	subtitle: "记录思考、代码与正在进行的事情",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 42, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/banner-7omb.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "top", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		{
			src: "/favicon/avatar-favicon-32.png",
			sizes: "32x32",
		},
		{
			src: "/favicon/avatar-favicon-128.png",
			sizes: "128x128",
		},
		{
			src: "/favicon/avatar-favicon-180.png",
			sizes: "180x180",
		},
		{
			src: "/favicon/avatar-favicon-192.png",
			sizes: "192x192",
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "友链",
			url: "/friends/",
		},
		{
			name: "GitHub",
			url: "https://github.com/7oMB2006", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar-7omb.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "7oMB",
	bio: "踽踽而行 步履不停",
	links: [
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili", // Replace with your Bilibili space URL
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/506159361",
		},
		{
			name: "个人网站（待定）",
			icon: "material-symbols:link",
			url: "https://example.com/",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/7oMB2006",
		},
		{
			name: "网易云音乐",
			icon: "simple-icons:neteasecloudmusic",
			url: "https://music.163.com/#/user/home?id=3340117172",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

export const giscusConfig = {
	enabled: true,
	repo: "7oMB2006/7oMB2006.github.io",
	repoId: "R_kgDOT9Dlnw",
	category: "Announcements",
	categoryId: "DIC_kwDOT9Dln84DDtT6",
	mapping: "pathname",
	reactionsEnabled: "1",
	emitMetadata: "0",
	inputPosition: "top",
	theme: "preferred_color_scheme",
	lang: "zh-CN",
	loading: "lazy",
};
