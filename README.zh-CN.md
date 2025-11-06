<h1 align="center">image2prompt</h1>

<div align="center">

[English](README.md)
[中文](README.zh-CN.md)
[WiseMindAI](https://wisemindai.app/?utm_source=github-image2prompt)

</div>

## 🌟 项目简介

**image2prompt** 是一个为创作者、设计师、AI 用户设计的轻量小工具，用来将网页中任意图片一键生成 Prompt 提示词。  
当你在网页上看到一张喜欢的图片，只需将鼠标移上去，右下角会出现一个小图标按钮 👇  
点击后，它会自动上传图片、生成提示词、复制到剪贴板，并跳转到你常用的 AI 平台生成相似风格图片。

![项目简介](https://github.com/user-attachments/assets/905995c7-bdb6-4c8f-b70d-44b24684c99d)

## ⚙️ 功能特性

| 功能模块              | 说明                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------- |
| 🧩 **模型选择**       | 可切换 **Gemini 2.5 Flash** 与 **智谱 GLM-4V**，每个模型单独保存 API Key 和模型名称           |
| 🌏 **多语言生成**     | 可选择 20 个国家语言生成提示词                                                                |
| 🖼️ **图片尺寸过滤**   | 仅大于设定尺寸（默认 256×256）的图片显示按钮                                                  |
| 📒 **生成历史**       | 你可以查看所有生成的历史                                                                      |
| 🎨 **自定义平台跳转** | 可配置默认跳转平台：OpenAI / Gemini / StableDiffusion / 即梦 / 可灵 / 豆包 / 海螺 AI / 自定义 |
| 💬 **提示词模板**     | 支持编辑提示词生成模板，打造你的专属风格                                                      |
| ✍️ **自定义说明输入** | 可选开启生成前的对话框，在生成提示词前补充诸如“换成霓虹城市背景”等说明                        |
| 🧭 **国际化界面**     | 支持中英文切换                                                                                |
| 🪶 **轻量级 UI**      | 借鉴 shadcnUI 风格，自绘组件，不依赖第三方库                                                  |
| 🔓 **开源与免费**     | 完全开源，永久免费使用                                                                        |
| 🧮 **画面比例预设**   | 提供常见比例并支持自定义，让生成的提示词与目标画面更契合                                      |
| 🚫 **域名过滤**       | 在指定域名的页面隐藏捕捉按钮，保持浏览体验纯净                                                |

## 🌈 安装方式

1. 克隆或下载本仓库

```bash
git clone https://github.com/pingan8787/image2prompt.git
```

2. 安装

下载完项目后，在 Chrome/Edge 浏览器拓展程序页 `chrome://extensions/` / `edge://extensions/` 中开启“开发者模式”，然后将整个项目拖拽进去即可，也可以点击左上角“**加载未打包的拓展程序**”，选择项目文件夹。

![安装](https://github.com/user-attachments/assets/eb006388-280b-4838-b7c3-7baf7fa37745)

## 🍭 使用

安装完插件，首先进入配置页，选择要使用的大模型并设置对应的 API Key：

- Gemini：[创建 Gemini API Key](https://aistudio.google.com/app/api-keys)
- 智谱 AI：[模型与控制台入口](https://docs.bigmodel.cn/cn/guide/start/model-overview)

![设置页](https://github.com/user-attachments/assets/1fa8451f-e06b-4c75-b99c-695f4aafe7fc)

然后，你就可以在任意页面中图片右下角看到“编辑”按钮，点击生成提示词啦！

想在生成前补充几句说明（例如「把背景改成霓虹城市」）？在 **设置 → 提示词生成** 中开启 **自定义指令输入**，生成前会弹出输入框，将你的补充说明与系统提示词一起发送给模型。

![项目简介](https://github.com/user-attachments/assets/905995c7-bdb6-4c8f-b70d-44b24684c99d)
