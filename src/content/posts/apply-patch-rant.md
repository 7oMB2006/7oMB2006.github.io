---
title: 沟槽的。apply_patch 何时修啊！
published: 2026-08-22
description: 这玩意恶心人好久了
tags: [吐槽, 技术]
category: 技术
draft: false
---

# 记不得啥时候开始的了，Windows desktop 的 Codex 的 `apply_patch` 这个工具突然就被 Windows 拒绝了

![Windows 拒绝 apply_patch](/images/posts/apply-patch-access-denied.png)

真的有点恶心，这个是很基础的 tool，agent 每次用都会尝试调用，然后被 Windows 拒绝，报 `Access is denied`，最后气不过只能先用 `git apply` 顶一下。但是即使我改了全局 Prompt 还是由于优先级不够导致它犹豫的回去尝试失败。

[OpenAI Codex issue #31776](https://github.com/openai/codex/issues/31776)

真的希望早点修 🙏

> 我要不还是去尝试一下 WSL 吧？
