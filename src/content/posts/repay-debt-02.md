---
title: 还债 02
published: 2026-09-02
description: “享受了超前的收益就要承担欠下认知债的风险”
tags: [还债]
category: 还债
draft: false
---

## 依旧晚上晚课还的债

### Schema

- Schema（模式 / 结构定义）

> 计算机中的通用概念，用来描述一份数据或系统应该具有怎样的结构，包括有哪些字段、字段是什么类型、彼此有什么约束等。数据库、API、配置文件等场景都会出现 Schema。

- JSON Schema（JSON 模式）

> 专门用于描述和验证 JSON 数据结构的一套标准。它可以规定 JSON 是对象还是数组、包含哪些字段、字段的数据类型、哪些字段必须存在等。

总的来说就是关于某个 API 接口的数据格式合同。

### MCP 与 API

- API

> 程序 ↔ 程序的接口。也可以简单地说，Agent 是通过程序，然后再通过 API 来使用的，Agent 不直接消费 API。

- MCP Server

> MCP 单个词可以严谨地说是 **Agent / 客户端连接、发现和调用这些外部能力的标准协议**。
>
> 而 MCP Server 则是实现 MCP，并把 API、本地程序、数据库、文件、内部业务逻辑等各种能力封装成 Agent 能理解的若干 Tools 等能力，提供给 Agent 的服务。可以简单地理解为 Agent 所在的框架外的外挂服务。
>
> 大部分语境里可能会简化地把 MCP Server 直接称为 MCP，理解其意思即可。所以对照 API 的举例也可以说，MCP 才是 Agent 可以直接消费的。

- 可以拿我的 [Bilibili-Video-Research](https://github.com/7oMB2006/Bilibili-Video-Research) 项目举例子。

  ```text
              Codex / OpenCode
               Agent / Client
                     │
                     │ MCP 协议
                     ↓
          Bilibili-Video-Research
                MCP Server
                     │
             注册多个 Tools
          ┌──────────┼───────────┐
          ↓          ↓           ↓
   analyze_video   inspect     analyze_bilibili
          │          │           │
          └──────────┼───────────┘
                     ↓
                内部业务逻辑
                     │
   ┌─────────────────┼────────────────┐
   ↓                 ↓                ↓
  Bilibili API       StepFun API       Gemini API
         │
       yt-dlp
         │
       FFmpeg
         │
      本地视频文件
  ```
