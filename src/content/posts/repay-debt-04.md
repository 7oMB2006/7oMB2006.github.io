---
title: 还债 04
published: 2026-09-19
showImageOnPost: false
description: 占位
image: /images/posts/repay-debt-04-canva.png
tags: [还债, 技术]
category: 还债
draft: false
---

## SaaS 和 MaaS

它们俩都是商业模式。

- **SaaS** = Software as a Service
软件作为服务提供，比如 Canva、Seko。
- **MaaS** = Model as a Service
模型作为服务提供，比如阿里云百炼、硅基流动、OpenRouter。
- **IaaS** = Infrastructure as a Service
基础设施作为服务提供，比如阿里云、腾讯云。

## 切图

切图，就是把设计稿转成前端可用的页面结构和视觉资产。

```text
设计稿 / Figma
      ↓
分析页面结构
      ↓
拆组件
      ↓
写 HTML / React / Vue
      ↓
写 CSS / Tailwind
      ↓
导出必要的 SVG / PNG / WebP
      ↓
做响应式和视觉还原
```

当然，在现在这个时代，Agent 已经在逐步学会切图了，传统切图正在被消化掉。

## Canva

Canva（可画）是一个面向普通人的平面 / 视觉设计 SaaS。
![Canva 功能展示](/images/posts/repay-debt-04-canva.png)

一般会拿它做：

- 海报、社交媒体配图
- PPT、简历、宣传页
- Logo、封面
- 简单视频
- 简单网页 / Landing Page

对于我们来说，用途比较有限。

## Sites

Sites 是面向网页制作的 AI 建站 SaaS，也是 OpenAI 自己的产品能力。
![Sites 功能展示](/images/posts/repay-debt-04-sites.png)

你可以用它：

- 从零到一编写网页源码
- 托管在 Sites 中编写的页面，或者把自己本地的源码上线
- 导出 Sites 编写的源码，转为自己的资产

它可以在 ChatGPT Work 和 Classic 中使用，内部集成了很多前端 skill，适合简单、快速地创建网站并上线。

## Adapter

经常在项目里看到的 Adapter，是面向“接口不一致”的适配器。

它就像一个翻译，对接两头不同的口径。它面向的对象可以很多：

- API 接口不一致
- 数据结构不一致
- 函数 / 类接口不一致
- 第三方 SDK 不一致
- 数据库访问方式不一致
- 不同模型供应商不一致
- 新旧系统不一致
- 不同浏览器 / 平台差异

它可以是一个函数、一个类，或者一个独立模块。

## SSH、HTTP、SSE、WebSocket

它们都是网络通信相关的技术，关系大致是这样：

```text
SSH

HTTP
├─ 普通请求响应
└─ SSE

WebSocket
```



### SSH

远端的服务器或者云服务器，想要在本机登录并操作，就可以通过 SSH 进行远程通信。

### HTTP 与 SSE

老大哥 HTTP 是一种应用层网络协议，用来规定客户端和服务器之间“怎么发请求、怎么回响应”。

普通的 HTTP 请求是客户端和服务端一来一回。比如客户端请求一个 GET 接口，服务端返回一个 OK 和对应内容。

而小弟 SSE（流式输出）是一种基于 HTTP 的服务器单向持续推送机制。客户端先发起一次 HTTP 请求，服务器保持这个响应连接不关闭，并持续把事件流发送给客户端。

Agent / LLM 时代确实让 SSE 的存在感明显变高了，毕竟大部分 Agent 都需要实时返回状态。

### WebSocket

WebSocket 是一种在单个长连接上进行全双工通信的网络协议。它的特点是，连接一旦建立，客户端和服务器双方都可以随时主动发消息，就像打电话一样。

聊天室、实时行情等场景都会用到它。

它通常先通过 HTTP 完成握手，然后把连接升级成 WebSocket。之后就不再是普通的 HTTP 请求-响应模式了。