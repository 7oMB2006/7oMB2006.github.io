---
title: 多agent的一个思想
published: 2026-09-10
showImageOnPost: false
description: 创造更多可能，收敛于更稠密的答案。
image: /images/posts/multi-agent-collaboration.png
tags: [技术, 灵光]
category: 技术
draft: false
---

![多智能体协作](/images/posts/multi-agent-collaboration.png)

# 前言

## 以前我就一直在想，多 Agent 之间是否会产生火花。

刚开始是想着在 XiūCore 里做小岫和季两个拟人化 Agent，模拟两个好朋友进行日常聊天。我作为观测者，可以看看他们能否聊出一些有趣的事情。

> 当然我还没做呢，哈哈哈。XiūCore 被我搁置了，不过作为拟人化的一条追求道路，以后我迟早都会做的。

## 后来我在给 oh-dsh 贡献代码的时候，尝试过单开会话做二审，以保障质量。

这个想法初具雏形：先是在 OpenCode 里做的，后来发现 Codex 有自己的原生会话线程工具 `thread_read` 系列。它们可以互相阅读对方的上下文，了解对方在做什么，也可以给对面发消息。

直到今天老蟹也发现了这个思想，我重新梳理之后才知道，这个定性应该叫作 **A2A（Agent-to-Agent）智能体到智能体通信**。

![A2A 代码审查会话示例](/images/posts/a2a-review-screenshot.png)

> 我的样例归档了，就拿老蟹的了 ovo。

## 最近还在给 XDJ 做功能，想到以前 AstrBot 有一个 A 股插件，其中有一个叫“多空辩论”的脚本。再结合 DSA 底座中不同策略配置的 YAML，于是就想做这个辩论委员会。

它的架构设计大概是这样的：

一条链路里有几个 Agent 共享上下文，他们有自己的打法，比如江恩、缠论、波段、趋势、打板、抄底、价投、情绪、消息等等，在一起辩论。本质上感觉和多因子很像，只不过是由 Agent 代行。

这里很重要的一点是：最好第一轮先独立回答，不要一开始就看到其他 Agent 的答案。不然容易产生锚定和从众，造成噪音，削弱结果质量。

如果说 XDJ 已经拥有管家和掘金两位外挂 Agent，那么 XDJ 已经可以叫作 **MAS（Multi-Agent System）多智能体系统** 了。

然后再加上这个辩论委员会，委员会的本质就是 **MAD（Multi-Agent Debate）多智能体辩论**。

但是我的设计特点是成员模型可以不一样，知识库最好也不一样，这样就更依靠细致的设计来实现 **HEA（Heterogeneous Expert Agents）异构专家智能体**。

回头去看小岫和季的那个，也叫 **MAD（Multi-Agent Dialogue）多智能体对话**。这个 MAD 的区别就是，除去开启生命周期的那一轮，后面的上下文全是 Agent 对方给的。

## 暂且就写到这，也放一颗 GPT 的解释树。

### MAS（Multi-Agent System）多智能体系统

```text
             MAS
              │
      ┌───────┴────────┐
      │                │
 Multi-Agent Debate  Multi-Agent Dialogue
      │                │
   XDJ 委员会        小岫 ↔ 季
      │                │
   分歧 → 收敛       互动 → 涌现
      │                │
 找更可靠答案       找新话题/新想法
```

### MAD 下的委员会设想：HEA

```text
                 Shared Context
                       │
   ┌───────────────┬───┴────┬───────────────┬───────────────┐
   ↓               ↓        ↓               ↓
Overview        Technical Fundamental     Risk
Agent           Agent      Agent           Agent
│               │          │               │
总览            不同 Model  不同 Model      不同 Model
│               │          │               │
不同 Model      不同 KB    不同 KB         不同 KB
不同 KB        不同 Tools 不同 Tools      不同 Tools
不同 Tools          │          │               │
│                   ↓          ↓               ↓
↓               Opinion B  Opinion C      Opinion D
Opinion A
└───────────────┴──────────┴───────────────┴───────────────┘
                       ↓
                      MAD
                       ↓
               Judge / Aggregator
```
### MAD（Multi-Agent Dialogue）多智能体对话

```text
小岫 Context₀
      ↓
小岫说 A
      ↓
A 成为季的新 Context
      ↓
季想到 B
      ↓
A + B 又成为小岫的新 Context
      ↓
小岫想到 C
      ↓
A + B + C → 季
      ↓
     ...
```

### A2A（Agent-to-Agent）智能体到智能体通信

```text
Agent A（代码 Agent）
        │
        │ “请对我的代码进行二审”
        ↓
Agent B（审查 Agent）
        │
        │ 审查 result
        ↓
Agent A（代码 Agent）
```