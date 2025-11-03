const DEFAULT_CONFIG = {
  geminiApiKey: "",
  model: "gemini-2.5-flash",
  promptInstruction:
    "You are an assistant that writes high quality text-to-image prompts. Provide a single prompt that can recreate the given image faithfully.",
  platformUrl: "https://labs.openai.com/?prompt={{prompt}}",
  minImageWidth: 256,
  minImageHeight: 256,
  promptLanguage: "en-US",
  language: "en",
  autoOpenPlatform: true,
  selectedPlatformId: "openai",
  selectedPlatformLabel: "OpenAI (DALL·E)",
  customPlatforms: []
};

const HISTORY_STORAGE_KEY = "generationHistory";
const MAX_HISTORY_ENTRIES = 100;
const PROVIDER_NAME = "Gemini";

const PROMPT_LANGUAGE_RULES = {
  "en-US": {
    name: "English (United States)",
    directive:
      "Write the response in natural English as used in the United States. Return only the final prompt in English with no other language or explanations."
  },
  "en-GB": {
    name: "English (United Kingdom)",
    directive:
      "Write the response in British English. Return only the final prompt in English and omit any additional commentary."
  },
  "zh-CN": {
    name: "Simplified Chinese",
    directive:
      "请使用简体中文撰写最终提示词，只输出提示词正文，不要包含其他语言或额外解释。"
  },
  "ja-JP": {
    name: "Japanese",
    directive:
      "回答は日本語のみで書き、追加の説明や他言語での翻訳は含めないでください。"
  },
  "ko-KR": {
    name: "Korean",
    directive:
      "응답은 한국어로만 작성하고, 다른 언어 번역이나 추가 설명은 포함하지 마세요."
  },
  "fr-FR": {
    name: "French",
    directive:
      "Rédigez uniquement le prompt final en français (France) sans ajouter d'autres langues ni explications supplémentaires."
  },
  "de-DE": {
    name: "German",
    directive:
      "Schreiben Sie ausschließlich den endgültigen Prompt auf Deutsch (Deutschland) ohne zusätzliche Sprachen oder Erläuterungen."
  },
  "es-ES": {
    name: "Spanish (Spain)",
    directive:
      "Escribe únicamente el prompt final en español de España, sin añadir otros idiomas ni explicaciones adicionales."
  },
  "es-MX": {
    name: "Spanish (Mexico)",
    directive:
      "Escribe solo el prompt final en español de México y evita incluir otros idiomas o explicaciones extra."
  },
  "it-IT": {
    name: "Italian",
    directive:
      "Scrivi esclusivamente il prompt finale in italiano (Italia) senza aggiungere altre lingue o spiegazioni."
  },
  "pt-BR": {
    name: "Portuguese (Brazil)",
    directive:
      "Escreva somente o prompt final em português do Brasil, sem outras línguas ou explicações adicionais."
  },
  "ru-RU": {
    name: "Russian",
    directive:
      "Напишите только итоговый промпт на русском языке (Россия), без других языков и дополнительных пояснений."
  },
  "hi-IN": {
    name: "Hindi",
    directive:
      "उत्तर केवल हिंदी (भारत) में लिखें और कोई अन्य भाषा या अतिरिक्त व्याख्या शामिल न करें।"
  },
  "ar-AE": {
    name: "Arabic (UAE)",
    directive:
      "اكتب فقط النص النهائي باللغة العربية كما تُستخدم في الإمارات، بدون لغات أخرى أو شروحات إضافية."
  },
  "nl-NL": {
    name: "Dutch",
    directive:
      "Schrijf uitsluitend de uiteindelijke prompt in het Nederlands (Nederland) en voeg geen andere talen of extra uitleg toe."
  },
  "tr-TR": {
    name: "Turkish",
    directive:
      "Yalnızca nihai metin istemini Türkçe (Türkiye) olarak yazın; başka dil veya ek açıklama eklemeyin."
  },
  "th-TH": {
    name: "Thai",
    directive:
      "เขียนเฉพาะพรอมต์สุดท้ายเป็นภาษาไทย (ประเทศไทย) โดยไม่ใส่ภาษาอื่นหรือคำอธิบายเพิ่มเติม"
  },
  "vi-VN": {
    name: "Vietnamese",
    directive:
      "Chỉ viết prompt cuối cùng bằng tiếng Việt (Việt Nam), không thêm ngôn ngữ khác hay giải thích bổ sung."
  },
  "id-ID": {
    name: "Indonesian",
    directive:
      "Tuliskan hanya prompt akhir dalam bahasa Indonesia tanpa bahasa lain atau penjelasan tambahan."
  },
  "pl-PL": {
    name: "Polish",
    directive:
      "Napisz wyłącznie końcowy prompt w języku polskim, bez innych języków i dodatkowych wyjaśnień."
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "generatePrompt") {
    handleGeneratePrompt(message, sender)
      .then((result) =>
        sendResponse({
          success: true,
          prompt: result.prompt,
          platformUrl: result.platformUrl,
          autoOpened: result.autoOpened
        })
      )
      .catch((error) => {
        console.error("[Image2Prompt] Failed generating prompt:", error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});

async function handleGeneratePrompt(message, sender) {
  const config = await getConfig();
  const imageData = await getImageDataFromMessage(message);
  const languageDirective = getLanguageDirective(config.promptLanguage);
  const instruction = config.promptInstruction || DEFAULT_CONFIG.promptInstruction;
  const model = config.model || DEFAULT_CONFIG.model;

  if (!config.geminiApiKey) {
    throw new Error("Gemini API key is not set in the extension options.");
  }

  const promptText = await requestPromptFromGemini({
    apiKey: config.geminiApiKey,
    model,
    instruction,
    languageDirective,
    imageBase64: imageData.data,
    imageMimeType: imageData.mimeType,
    altText: message.imageAlt || ""
  });

  const trimmedPrompt = promptText.trim();
  if (!trimmedPrompt) {
    throw new Error("Gemini did not return any prompt text.");
  }
  const platformUrl = buildPlatformUrl(config.platformUrl, trimmedPrompt);
  const shouldAutoOpen = config.autoOpenPlatform !== false;
  let autoOpened = false;

  if (platformUrl && shouldAutoOpen) {
    try {
      await openPlatformTab(platformUrl, sender?.tab?.windowId);
      autoOpened = true;
    } catch (error) {
      console.warn("[Image2Prompt] Unable to open AI platform tab:", error);
    }
  }

  appendGenerationHistorySafe({
    prompt: trimmedPrompt,
    provider: PROVIDER_NAME,
    model,
    createdAt: Date.now(),
    platformName: config.selectedPlatformLabel || config.selectedPlatformId || "",
    platformId: config.selectedPlatformId || "",
    platformUrl: config.platformUrl || "",
    imageDataUrl: buildDataUrl(imageData?.mimeType, imageData?.data),
    imageAlt: message.imageAlt || ""
  });

  return { prompt: trimmedPrompt, platformUrl, autoOpened };
}

async function getConfig() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(DEFAULT_CONFIG, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(items);
      }
    });
  });
}

async function getImageData(imageUrl) {
  if (imageUrl.startsWith("data:")) {
    const { mimeType, data } = parseDataUrl(imageUrl);
    return { mimeType, data };
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Could not fetch the image (status ${response.status}).`);
  }

  const mimeType =
    response.headers.get("content-type") || "image/png";
  const buffer = await response.arrayBuffer();

  return {
    mimeType,
    data: arrayBufferToBase64(buffer)
  };
}

async function getImageDataFromMessage(message) {
  const providedBase64 = message.imageBase64;
  const providedMime = message.imageMimeType;

  if (providedBase64 && providedMime) {
    return {
      mimeType: providedMime,
      data: providedBase64
    };
  }

  return getImageData(message.imageUrl);
}

async function requestPromptFromGemini({
  apiKey,
  model,
  instruction,
  languageDirective,
  imageBase64,
  imageMimeType,
  altText
}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const parts = [];

  const trimmedInstruction = instruction?.trim() ?? "";
  const trimmedDirective = languageDirective?.trim() ?? "";

  if (trimmedInstruction) {
    parts.push({ text: trimmedInstruction });
  }

  if (trimmedDirective) {
    parts.push({ text: trimmedDirective });
  }

  parts.push({
    inline_data: {
      mime_type: imageMimeType,
      data: imageBase64
    }
  });

  if (altText) {
    parts.push({
      text: `Image alt text: ${altText}`
    });
  }

  const payload = {
    contents: [
      {
        role: "user",
        parts
      }
    ],
    generationConfig: {
      temperature: 0.4,
      topK: 32,
      topP: 0.95
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorDetails = await safeReadJson(response);
    throw new Error(
      errorDetails?.error?.message ||
        `Gemini API error (status ${response.status}).`
    );
  }

  const result = await response.json();
  const promptText =
    result?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("\n")
      .trim() || "";

  if (!promptText) {
    throw new Error("Gemini did not return any prompt text.");
  }

  return promptText;
}

function buildPlatformUrl(template, prompt) {
  const trimmedTemplate = (template || DEFAULT_CONFIG.platformUrl).trim();
  if (!trimmedTemplate) {
    return "";
  }

  const encodedPrompt = encodeURIComponent(prompt);
  if (trimmedTemplate.includes("{{prompt}}")) {
    return trimmedTemplate.replace(/{{prompt}}/g, encodedPrompt);
  }

  const separator = trimmedTemplate.includes("?") ? "&" : "?";
  return `${trimmedTemplate}${separator}prompt=${encodedPrompt}`;
}

async function openPlatformTab(url, windowId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.create(
      {
        url,
        windowId
      },
      (tab) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(tab);
        }
      }
    );
  });
}

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function parseDataUrl(url) {
  const match = url.match(/^data:([^;,]+)?(?:;base64)?,(.*)$/);
  if (!match) {
    throw new Error("Unsupported data URL format.");
  }
  const mimeType = match[1] || "image/png";
  const data = match[2];
  if (!url.includes(";base64,")) {
    return {
      mimeType,
      data: btoa(decodeURIComponent(data))
    };
  }
  return { mimeType, data };
}

async function safeReadJson(response) {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
}

function getLanguageDirective(code) {
  if (!code) {
    return "";
  }
  const entry = PROMPT_LANGUAGE_RULES[code] ?? PROMPT_LANGUAGE_RULES["en-US"];
  return entry.directive;
}

function buildDataUrl(mimeType, base64) {
  if (!base64) {
    return "";
  }
  const safeMime = mimeType || "image/png";
  return `data:${safeMime};base64,${base64}`;
}

function appendGenerationHistorySafe(entry) {
  appendGenerationHistory(entry).catch((error) => {
    console.warn("[Image2Prompt] Unable to store generation history:", error);
  });
}

async function appendGenerationHistory(entry) {
  const sanitized = sanitizeHistoryEntry(entry);
  if (!sanitized) {
    return;
  }

  const history = (await readGenerationHistory())
    .map(sanitizeHistoryEntry)
    .filter(Boolean);
  history.unshift(sanitized);
  if (history.length > MAX_HISTORY_ENTRIES) {
    history.length = MAX_HISTORY_ENTRIES;
  }
  await writeGenerationHistory(history);
}

function sanitizeHistoryEntry(entry) {
  if (!entry || !entry.prompt) {
    return null;
  }
  const id = entry.id || `hist-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    id,
    prompt: String(entry.prompt || ""),
    provider: entry.provider || PROVIDER_NAME,
    model: entry.model || "",
    platformName: entry.platformName || "",
    platformId: entry.platformId || "",
    platformUrl: entry.platformUrl || "",
    imageDataUrl: entry.imageDataUrl || "",
    imageAlt: entry.imageAlt || "",
    createdAt: Number(entry.createdAt) || Date.now()
  };
}

function readGenerationHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [HISTORY_STORAGE_KEY]: [] }, (items) => {
      const list = items?.[HISTORY_STORAGE_KEY];
      resolve(Array.isArray(list) ? list : []);
    });
  });
}

function writeGenerationHistory(history) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [HISTORY_STORAGE_KEY]: history }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}
