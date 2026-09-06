import { h } from "hastscript";
import {
	extractBilibiliVideoId,
	formatBilibiliCount,
	formatBilibiliDate,
	formatBilibiliDuration,
	normalizeBilibiliUrl,
} from "./bilibili-utils.mjs";

const BILIBILI_ICON_PATH =
	"M488.6 104.1c16.7 18.1 24.4 39.7 23.3 65.7v202.4c-.4 26.4-9.2 48.1-26.5 65.1c-17.2 17-39.1 25.9-65.5 26.7H92.02c-26.45-.8-48.21-9.8-65.28-27.2C9.682 419.4.767 396.5 0 368.2V169.8c.767-26 9.682-47.6 26.74-65.7C43.81 87.75 65.57 78.77 92.02 78h29.38L96.05 52.19c-5.75-5.73-8.63-13-8.63-21.79c0-8.8 2.88-16.06 8.63-21.797C101.8 2.868 109.1 0 117.9 0q13.2 0 21.9 8.603L213.1 78h88l74.5-69.397C381.7 2.868 389.2 0 398 0q13.2 0 21.9 8.603c5.7 5.737 8.6 12.997 8.6 21.797c0 8.79-2.9 16.06-8.6 21.79L394.6 78h29.3c26.4.77 48 9.75 64.7 26.1m-38.8 69.7c-.4-9.6-3.7-17.4-10.7-23.5c-5.2-6.1-14-9.4-22.7-9.8H96.05c-9.59.4-17.45 3.7-23.58 9.8c-6.14 6.1-9.4 13.9-9.78 23.5v194.4c0 9.2 3.26 17 9.78 23.5s14.38 9.8 23.58 9.8H416.4c9.2 0 17-3.3 23.3-9.8s9.7-14.3 10.1-23.5zm-264.3 42.7c6.3 6.3 9.7 14.1 10.1 23.2V273c-.4 9.2-3.7 16.9-9.8 23.2c-6.2 6.3-14 9.5-23.6 9.5s-17.5-3.2-23.6-9.5s-9.4-14-9.8-23.2v-33.3c.4-9.1 3.8-16.9 10.1-23.2s13.2-9.6 23.3-10c9.2.4 17 3.7 23.3 10m191.5 0c6.3 6.3 9.7 14.1 10.1 23.2V273c-.4 9.2-3.7 16.9-9.8 23.2s-14 9.5-23.6 9.5s-17.4-3.2-23.6-9.5c-7-6.3-9.4-14-9.7-23.2v-33.3c.3-9.1 3.7-16.9 10-23.2s14.1-9.6 23.3-10c9.2.4 17 3.7 23.3 10";

function createBilibiliIcon(className) {
	return h(
		"svg",
		{
			class: className,
			viewBox: "0 0 512 512",
			"aria-hidden": "true",
			focusable: "false",
		},
		[h("path", { fill: "currentColor", d: BILIBILI_ICON_PATH })],
	);
}

export function BilibiliCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0) {
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("bilibili" directive must be leaf type "::bilibili{url="..."}")',
		]);
	}

	const sourceUrl = typeof properties.url === "string" ? properties.url : "";
	const bvid = String(
		properties.bvid || extractBilibiliVideoId(sourceUrl) || "",
	);
	if (!bvid) {
		return h("div", { class: "hidden" }, "Invalid Bilibili video URL.");
	}

	const cardUuid = `BC${Math.random().toString(36).slice(-7)}`;
	const videoUrl = normalizeBilibiliUrl(sourceUrl, bvid);
	const title = String(properties.title || `Bilibili 视频 ${bvid}`);
	const cover = String(properties.cover || "");
	const owner = String(properties.owner || "");
	const published = formatBilibiliDate(properties.pubdate);
	const description = String(properties.description || "").trim();
	const duration = formatBilibiliDuration(properties.duration);
	const stats = [
		["bc-stat-play", "播放", properties.view],
		["bc-stat-like", "点赞", properties.like],
		["bc-stat-coin", "投币", properties.coin],
		["bc-stat-favorite", "收藏", properties.favorite],
	].filter(([, , value]) => value !== undefined && value !== "");

	const coverChildren = cover
		? [
				h("img", {
					class: "bc-cover",
					src: cover,
					alt: `${title} 视频封面`,
					loading: "eager",
					referrerpolicy: "no-referrer",
					decoding: "async",
				}),
				h("span", { class: "bc-duration" }, duration),
			]
		: [
				h("div", { class: "bc-cover-placeholder" }, [
					createBilibiliIcon("bc-cover-mark"),
				]),
			];

	const metadataChildren = [];
	if (owner || published) {
		metadataChildren.push(
			h(
				"div",
				{ class: "bc-meta" },
				[
					owner ? h("span", { class: "bc-owner" }, owner) : null,
					owner && published
						? h("span", { class: "bc-meta-divider" }, "·")
						: null,
					published ? h("time", { datetime: published }, published) : null,
				].filter(Boolean),
			),
		);
	}
	if (description)
		metadataChildren.push(h("p", { class: "bc-description" }, description));
	if (stats.length > 0) {
		metadataChildren.push(
			h("div", { class: "bc-stats" }, [
				...stats.map(([className, label, value]) =>
					h(
						"span",
						{ class: `bc-stat ${className}` },
						`${label} ${formatBilibiliCount(value)}`,
					),
				),
				h("span", { class: "bc-stat bc-stat-duration" }, duration),
			]),
		);
	}

	return h(
		`a#${cardUuid}`,
		{
			class: "card-bilibili no-styling",
			href: videoUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": `打开 Bilibili 视频：${title}`,
			"data-bvid": bvid,
		},
		[
			h("div", { class: "bc-cover-wrap" }, coverChildren),
			h("div", { class: "bc-content" }, [
				h("div", { class: "bc-brand" }, [
					createBilibiliIcon("bc-brand-mark"),
					h("span", {}, "Bilibili"),
				]),
				h("div", { class: "bc-title" }, title),
				...metadataChildren,
			]),
		],
	);
}
