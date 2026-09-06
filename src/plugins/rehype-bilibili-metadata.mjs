import { visit } from "unist-util-visit";
import {
	extractBilibiliVideoId,
	normalizeBilibiliCoverUrl,
} from "./bilibili-utils.mjs";

const metadataCache = new Map();

export function rehypeBilibiliMetadata() {
	return async (tree) => {
		const nodes = [];
		visit(tree, "element", (node) => {
			if (node.tagName === "bilibili") nodes.push(node);
		});

		await Promise.all(
			nodes.map(async (node) => {
				const properties = node.properties || {};
				const bvid = String(
					properties.bvid || extractBilibiliVideoId(properties.url) || "",
				);
				if (!bvid) return;

				node.properties = { ...properties, bvid };
				const metadata = await loadMetadata(bvid);
				if (!metadata) return;

				const owner =
					metadata.owner && typeof metadata.owner === "object"
						? metadata.owner
						: {};
				const stat =
					metadata.stat && typeof metadata.stat === "object"
						? metadata.stat
						: {};
				node.properties = {
					...node.properties,
					title: properties.title || metadata.title || "",
					cover: properties.cover || normalizeBilibiliCoverUrl(metadata.pic),
					owner: properties.owner || owner.name || "",
					pubdate: properties.pubdate || metadata.pubdate || "",
					description: properties.description || metadata.desc || "",
					duration: properties.duration || metadata.duration || "",
					view: properties.view || stat.view || "",
					like: properties.like || stat.like || "",
					coin: properties.coin || stat.coin || "",
					favorite: properties.favorite || stat.favorite || "",
				};
			}),
		);
	};
}

function loadMetadata(bvid) {
	if (!metadataCache.has(bvid)) metadataCache.set(bvid, fetchMetadata(bvid));
	return metadataCache.get(bvid);
}

async function fetchMetadata(bvid) {
	try {
		const response = await fetch(
			`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`,
			{
				headers: {
					Accept: "application/json",
					Referer: `https://www.bilibili.com/video/${bvid}/`,
				},
			},
		);
		if (!response.ok) return null;

		const payload = await response.json();
		if (!payload || payload.code !== 0 || !payload.data) return null;
		return payload.data;
	} catch {
		return null;
	}
}
