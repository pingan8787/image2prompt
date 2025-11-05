<h1 align="center">image2prompt</h1>

<div align="center">

[English](README.md)
[中文](README.zh-CN.md)
[WiseMindAI](https://wisemindai.app/?utm_source=github-image2prompt)

</div>

## 🌟 Overview

**image2prompt** is a lightweight tool designed for creators, designers, and AI users.  
When you hover over an image on any webpage, a small icon button will appear in the bottom-right corner 👇  
Click it, and the extension will automatically upload the image, generate a prompt, copy it to your clipboard, and open your preferred AI platform to reproduce the same style.

![Overview](https://github.com/user-attachments/assets/905995c7-bdb6-4c8f-b70d-44b24684c99d)

## ⚙️ Features

| Feature Module              | Description                                                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 🧩 **Model Selection**      | Switch between **Gemini 2.5 Flash** and **Zhipu GLM-4V** — each keeps its own API key and model ID                   |
| 🌏 **Multilingual Output**  | Generate prompts in 20 different languages                                                                           |
| 🖼️ **Image Size Filter**    | Only displays the button for images larger than the configured size (default: 256×256)                               |
| 📒 **Generation History**   | View all your generated prompts anytime                                                                              |
| 🎨 **Custom Platform Jump** | Configure the default AI platform: OpenAI / Gemini / StableDiffusion / JiMeng / Keling / Doubao / Hailuo AI / Custom |
| 💬 **Prompt Templates**     | Edit and customize prompt generation templates to build your unique style                                            |
| ✍️ **Custom Instructions**  | Enable a pre-generation dialog so you can blend extra guidance into every output                                      |
| 🧭 **Internationalized UI** | Easily switch between English and Chinese                                                                            |
| 🪶 **Lightweight UI**       | Inspired by shadcnUI, built with custom-drawn components and no third-party dependencies                             |
| 🔓 **Open Source & Free**   | 100% open-source and completely free to use                                                                          |

## 🌈 Installation

1. Clone or download this repository:

```bash
git clone https://github.com/pingan8787/image2prompt.git
```

2. Install the extension

After downloading the project, open the Chrome/Edge Extensions page: `chrome://extensions/` / `edge://extensions/` enable **Developer mode**, then drag the entire project folder into the page.

Alternatively, click Load unpacked, then select the project folder.

![Install](https://github.com/user-attachments/assets/eb006388-280b-4838-b7c3-7baf7fa37745)

## 🍭 Usage

After installing the extension, open the configuration page to choose your provider and set the corresponding API key:

- Gemini: [Create a Gemini API key](https://aistudio.google.com/app/api-keys)
- Zhipu AI: [Zhipu model overview & console](https://docs.bigmodel.cn/cn/guide/start/model-overview)

![Setting](https://github.com/user-attachments/assets/1fa8451f-e06b-4c75-b99c-695f4aafe7fc)

Then, whenever you hover over an image on any webpage, you’ll see an “Edit” button at the bottom-right corner — click it to generate a prompt!

Want to blend in extra guidance (for example, “switch the background to a neon city”)? Enable **Custom instructions input** in **Settings → Prompt Generation** to open a dialog before each run and merge your tweaks with the system prompt.

![Project](https://github.com/user-attachments/assets/905995c7-bdb6-4c8f-b70d-44b24684c99d)
