---
title: codex的原生thread read工具
published: 2026-09-14
showImageOnPost: false
description: 还是给朋友讲一下thread read的心得
image: /images/posts/codex-thread-read-overview.png
tags: [技术, 灵光]
category: 技术
draft: false
---

## 一般为什么用

`thread read` 是 Codex 原生提供的工具集。它可以让 Agent 阅读其他线程的会话，也可以向其他线程发送消息，就像两个员工之间的交流一样。

句式可以这样：

![thread read 调用示例](/images/posts/codex-thread-read-syntax.png)

线程会话 ID 可以右键获取：

![复制线程会话 ID](/images/posts/codex-thread-read-session-id.jpg)

## 继承旧会话

和直接分支不同，有时候旧会话会因为各种各样的小问题——比如更换供应商、上游堵塞、纯文本模型被强行灌入图片、换模型导致上文解析失败等等——直接报错，活不了了。即使分支了也唤不醒，但是会话记录还在。

这时就可以开一个新会话，用 `thread read` 读取并继承旧会话。

![读取旧会话](/images/posts/codex-thread-read-overview.png)

## 多会话协同（类似 A2A）

虽然可以开子代理审查，但是子代理的生命周期还是不如新开的同级会话健壮。所以，如果有项目二审的需求，就可以开新会话，用 `thread read` 让它自动审查。

![多会话工作区](/images/posts/codex-thread-read-workspace.png)

![向原线程发送处理请求](/images/posts/codex-thread-read-review-request.png)

![二审结果](/images/posts/codex-thread-read-review-result.png)

## 如果对多 Agent 协同感兴趣，可以看看这篇 blog

<a href="https://7omb2006.github.io/posts/multi-agent-idea/" target="_blank" rel="noopener noreferrer" class="card-base no-styling my-4 flex items-center gap-4 p-4 hover:bg-[var(--btn-card-bg-hover)]">
    <img src="/images/posts/multi-agent-collaboration.png" alt="多agent的一个思想" class="h-20 w-32 shrink-0 rounded-lg object-cover" />
    <span class="min-w-0">
        <strong class="block text-lg text-[var(--tw-prose-headings)]">多agent的一个思想</strong>
        <span class="mt-1 block text-sm text-[var(--tw-prose-body)]">创造更多可能，收敛于更稠密的答案。</span>
    </span>
</a>