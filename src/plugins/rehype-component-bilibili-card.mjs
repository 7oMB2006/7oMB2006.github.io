import { h } from "hastscript";
import {
	extractBilibiliVideoId,
	formatBilibiliCount,
	formatBilibiliDate,
	formatBilibiliDuration,
	normalizeBilibiliUrl,
} from "./bilibili-utils.mjs";

export function BilibiliCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0) {
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("bilibili" directive must be leaf type "::bilibili{url=\"...\"}")',
		]);
	}

	const sourceUrl = typeof properties.url === "string" ? properties.url : "";
	const bvid = String(properties.bvid || extractBilibiliVideoId(sourceUrl) || "");
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
		: [h("div", { class: "bc-cover-placeholder" }, [h("span", { class: "bc-cover-mark" }, "B")])];

	const metadataChildren = [];
	if (owner || published) {
		metadataChildren.push(
			h("div", { class: "bc-meta" }, [
				owner ? h("span", { class: "bc-owner" }, owner) : null,
				owner && published ? h("span", { class: "bc-meta-divider" }, "·") : null,
				published ? h("time", { datetime: published }, published) : null,
			].filter(Boolean)),
		);
	}
	if (description) metadataChildren.push(h("p", { class: "bc-description" }, description));
	if (stats.length > 0) {
		metadataChildren.push(
			h("div", { class: "bc-stats" }, [
				...stats.map(([className, label, value]) =>
					h("span", { class: `bc-stat ${className}` }, `${label} ${formatBilibiliCount(value)}`),
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
					h("span", { class: "bc-brand-mark", "aria-hidden": "true" }, "B"),
					h("span", {}, "Bilibili"),
				]),
				h("div", { class: "bc-title" }, title),
				...metadataChildren,
			]),
		],
	);
}

