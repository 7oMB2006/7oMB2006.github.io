export function extractBilibiliVideoId(value) {
	if (typeof value !== "string") return "";

	const match = value.match(/(?:^|[^A-Za-z0-9])(BV[0-9A-Za-z]{10,15})/i);
	return match?.[1] || "";
}

export function normalizeBilibiliUrl(
	value,
	bvid = extractBilibiliVideoId(value),
) {
	if (typeof value === "string" && value.trim()) return value.trim();
	return bvid
		? `https://www.bilibili.com/video/${bvid}/`
		: "https://www.bilibili.com/";
}

export function normalizeBilibiliCoverUrl(value) {
	if (typeof value !== "string" || !value.trim()) return "";

	const coverUrl = value.trim();
	if (coverUrl.startsWith("//")) return `https:${coverUrl}`;
	if (coverUrl.startsWith("http://"))
		return `https://${coverUrl.slice("http://".length)}`;
	return coverUrl;
}

export function formatBilibiliCount(value) {
	const number = Number(value);
	if (!Number.isFinite(number) || number < 0) return "0";
	if (number >= 100_000_000) return `${trimDecimal(number / 100_000_000)}亿`;
	if (number >= 10_000) return `${trimDecimal(number / 10_000)}万`;
	return Math.round(number).toString();
}

export function formatBilibiliDuration(value) {
	if (typeof value === "string" && value.includes(":")) return value;

	const totalSeconds = Math.max(0, Math.floor(Number(value) || 0));
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	if (hours > 0)
		return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function formatBilibiliDate(value) {
	const timestamp = Number(value);
	if (Number.isFinite(timestamp) && timestamp > 0) {
		return new Date(timestamp * 1000).toISOString().slice(0, 10);
	}

	return typeof value === "string" ? value.slice(0, 10) : "";
}

function trimDecimal(value) {
	return value.toFixed(1).replace(/\.0$/, "");
}
