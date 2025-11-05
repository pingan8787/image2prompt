const DEFAULT_PROVIDER_ID = "gemini";

const PROVIDER_DEFAULTS = {
  gemini: {
    name: "Gemini",
    model: "gemini-2.5-flash"
  },
  zhipu: {
    name: "Zhipu AI",
    model: "glm-4v-plus"
  }
};

const DEFAULT_CONFIG = {
  llmProvider: DEFAULT_PROVIDER_ID,
  providerSettings: createDefaultProviderSettings(),
  geminiApiKey: "",
  zhipuApiKey: "",
  model: PROVIDER_DEFAULTS.gemini.model,
  zhipuModel: PROVIDER_DEFAULTS.zhipu.model,
  promptInstruction:
    "You are an assistant that writes high quality text-to-image prompts. Provide a single prompt that can recreate the given image faithfully.",
  platformUrl: "https://www.midjourney.com/?prompt={{prompt}}",
  minImageWidth: 256,
  minImageHeight: 256,
  promptLanguage: "en-US",
  language: "en",
  autoOpenPlatform: true,
  selectedPlatformId: "midjourney",
  selectedPlatformLabel: "Midjourney",
  customPlatforms: [],
  enableCustomPromptInput: false
};

const HISTORY_STORAGE_KEY = "generationHistory";
const MAX_HISTORY_ENTRIES = 100;

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

const LLM_PROVIDERS = {
  gemini: {
    id: "gemini",
    name: PROVIDER_DEFAULTS.gemini.name,
    defaultModel: PROVIDER_DEFAULTS.gemini.model,
    generate: requestPromptFromGemini
  },
  zhipu: {
    id: "zhipu",
    name: PROVIDER_DEFAULTS.zhipu.name,
    defaultModel: PROVIDER_DEFAULTS.zhipu.model,
    generate: requestPromptFromZhipu
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
  const { providerId, provider, settings } = resolveProvider(config);
  const imageData = await getImageDataFromMessage(message);
  const languageDirective = getLanguageDirective(config.promptLanguage);
  const instruction = config.promptInstruction || DEFAULT_CONFIG.promptInstruction;
  const runtimeInstruction =
    typeof message.customInstruction === "string"
      ? message.customInstruction.trim()
      : "";
  const customInstruction = runtimeInstruction;
  const model =
    settings.model?.trim() ||
    provider.defaultModel ||
    PROVIDER_DEFAULTS[DEFAULT_PROVIDER_ID].model;

  if (!settings.apiKey) {
    throw new Error(`${provider.name} API key is not set in the extension options.`);
  }
  console.log('[image2prompt 提示词配置]', {
    apiKey: settings.apiKey,
    model,
    instruction,
    customInstruction,
    languageDirective,
    imageBase64: imageData.data,
    imageMimeType: imageData.mimeType,
    altText: message.imageAlt || ""
  })
  const promptText = await provider.generate({
    apiKey: settings.apiKey,
    model,
    instruction,
    languageDirective,
    customInstruction,
    imageBase64: imageData.data,
    imageMimeType: imageData.mimeType,
    altText: message.imageAlt || ""
  });

  const trimmedPrompt = promptText.trim();
  if (!trimmedPrompt) {
    throw new Error(`${provider.name} did not return any prompt text.`);
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
    provider: provider.name,
    providerId,
    model,
    createdAt: Date.now(),
    platformName: config.selectedPlatformLabel || config.selectedPlatformId || "",
    platformId: config.selectedPlatformId || "",
    platformUrl: config.platformUrl || "",
    imageDataUrl: buildDataUrl(imageData?.mimeType, imageData?.data),
    imageAlt: message.imageAlt || "",
    customInstruction
  });

  return { prompt: trimmedPrompt, platformUrl, autoOpened };
}

async function getConfig() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(DEFAULT_CONFIG, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(sanitizeConfig(items));
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
  customInstruction,
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
  const trimmedCustomInstruction = customInstruction?.trim() ?? "";

  if (trimmedInstruction) {
    parts.push({ text: trimmedInstruction });
  }

  if (trimmedDirective) {
    parts.push({ text: trimmedDirective });
  }

  if (trimmedCustomInstruction) {
    parts.push({
      text: `Additional user instructions to combine with the image: ${trimmedCustomInstruction}`
    });
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

async function requestPromptFromZhipu({
  apiKey,
  model,
  instruction,
  customInstruction,
  languageDirective,
  imageBase64,
  imageMimeType,
  altText
}) {
  const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
  const textSegments = [];
  const trimmedInstruction = instruction?.trim() ?? "";
  const trimmedDirective = languageDirective?.trim() ?? "";
  const trimmedCustomInstruction = customInstruction?.trim() ?? "";

  if (trimmedInstruction) {
    textSegments.push(trimmedInstruction);
  }
  if (trimmedDirective) {
    textSegments.push(trimmedDirective);
  }
  if (altText) {
    textSegments.push(`Image alt text: ${altText}`);
  }
  if (trimmedCustomInstruction) {
    textSegments.push(
      `Additional user instructions to blend with the final prompt:\n${trimmedCustomInstruction}`
    );
  }

  const content = [];
  if (textSegments.length > 0) {
    content.push({
      type: "text",
      text: textSegments.join("\n\n")
    });
  }
  const safeMimeType = imageMimeType || "image/png";
  content.push({
    type: "image_url",
    image_url: {
      url: `data:${safeMimeType};base64,${imageBase64}`
    }
  });

  const payload = {
    model,
    messages: [
      {
        role: "user",
        content
      }
    ],
    temperature: 0.4,
    top_p: 0.95
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorDetails = await safeReadJson(response);
    throw new Error(
      errorDetails?.error?.message ||
      `Zhipu AI API error (status ${response.status}).`
    );
  }

  const result = await response.json();
  const messageContent = result?.choices?.[0]?.message?.content;
  const promptText = extractTextFromZhipuContent(messageContent).trim();
  if (!promptText) {
    throw new Error("Zhipu AI did not return any prompt text.");
  }
  return promptText;
}

function extractTextFromZhipuContent(content) {
  if (!content) {
    return "";
  }
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((part) => extractTextFromZhipuContent(part))
      .filter(Boolean)
      .join("\n");
  }
  if (typeof content === "object") {
    if (typeof content.text === "string") {
      return content.text;
    }
    if (content.type === "text" && typeof content.text === "string") {
      return content.text;
    }
    if (content.type === "output_text" && typeof content.text === "string") {
      return content.text;
    }
    if (Array.isArray(content.content)) {
      return extractTextFromZhipuContent(content.content);
    }
  }
  return "";
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
  const rawProviderName = entry.provider ? String(entry.provider) : "";
  let providerId = entry.providerId ? normalizeProviderId(entry.providerId) : "";
  if (!providerId && rawProviderName) {
    providerId = inferProviderIdFromName(rawProviderName);
  }
  if (!providerId) {
    providerId = DEFAULT_PROVIDER_ID;
  }
  const providerDescriptor = LLM_PROVIDERS[providerId];
  const providerName =
    rawProviderName ||
    providerDescriptor?.name ||
    PROVIDER_DEFAULTS[providerId]?.name ||
    PROVIDER_DEFAULTS[DEFAULT_PROVIDER_ID].name;
  const defaultModel = PROVIDER_DEFAULTS[providerId]?.model || "";
  return {
    id,
    prompt: String(entry.prompt || ""),
    provider: providerName,
    providerId,
    model: entry.model ? String(entry.model) : defaultModel,
    platformName: entry.platformName || "",
    platformId: entry.platformId || "",
    platformUrl: entry.platformUrl || "",
    imageDataUrl: entry.imageDataUrl || "",
    imageAlt: entry.imageAlt || "",
    createdAt: Number(entry.createdAt) || Date.now(),
    customInstruction: entry.customInstruction
      ? String(entry.customInstruction)
      : ""
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

function resolveProvider(config) {
  const providerId = normalizeProviderId(config.llmProvider);
  const provider = LLM_PROVIDERS[providerId] || LLM_PROVIDERS[DEFAULT_PROVIDER_ID];
  const settingsSource =
    config.providerSettings?.[providerId] || createDefaultProviderSettings()[providerId];
  return {
    providerId,
    provider,
    settings: {
      apiKey: settingsSource?.apiKey ? String(settingsSource.apiKey) : "",
      model: settingsSource?.model
        ? String(settingsSource.model)
        : provider.defaultModel
    }
  };
}

function sanitizeConfig(raw) {
  const merged = { ...DEFAULT_CONFIG, ...raw };
  const providerSettings = sanitizeProviderSettings(raw?.providerSettings, raw);
  merged.providerSettings = providerSettings;
  merged.llmProvider = normalizeProviderId(raw?.llmProvider ?? merged.llmProvider);
  merged.geminiApiKey = providerSettings.gemini.apiKey;
  merged.model = providerSettings.gemini.model;
  merged.zhipuApiKey = providerSettings.zhipu.apiKey;
  merged.zhipuModel = providerSettings.zhipu.model;
  merged.enableCustomPromptInput = merged.enableCustomPromptInput === true;
  return merged;
}

function sanitizeProviderSettings(raw, legacySource = {}) {
  const result = createDefaultProviderSettings();
  if (raw && typeof raw === "object") {
    Object.entries(raw).forEach(([providerId, entry]) => {
      if (!entry || typeof entry !== "object") {
        return;
      }
      const normalized = normalizeProviderId(providerId);
      result[normalized] = {
        apiKey: entry.apiKey ? String(entry.apiKey) : "",
        model: entry.model
          ? String(entry.model)
          : PROVIDER_DEFAULTS[normalized]?.model || ""
      };
    });
  }

  if (Object.prototype.hasOwnProperty.call(legacySource, "geminiApiKey")) {
    result.gemini.apiKey = legacySource.geminiApiKey
      ? String(legacySource.geminiApiKey)
      : "";
  }
  if (Object.prototype.hasOwnProperty.call(legacySource, "model")) {
    result.gemini.model = legacySource.model
      ? String(legacySource.model)
      : PROVIDER_DEFAULTS.gemini.model;
  }
  if (Object.prototype.hasOwnProperty.call(legacySource, "zhipuApiKey")) {
    result.zhipu.apiKey = legacySource.zhipuApiKey
      ? String(legacySource.zhipuApiKey)
      : "";
  }
  if (Object.prototype.hasOwnProperty.call(legacySource, "zhipuModel")) {
    result.zhipu.model = legacySource.zhipuModel
      ? String(legacySource.zhipuModel)
      : PROVIDER_DEFAULTS.zhipu.model;
  }

  return result;
}

function createDefaultProviderSettings() {
  const defaults = {};
  Object.entries(PROVIDER_DEFAULTS).forEach(([id, descriptor]) => {
    defaults[id] = {
      apiKey: "",
      model: descriptor.model
    };
  });
  return defaults;
}

function normalizeProviderId(value) {
  if (!value) {
    return DEFAULT_PROVIDER_ID;
  }
  const id = String(value).toLowerCase();
  return LLM_PROVIDERS[id]?.id || DEFAULT_PROVIDER_ID;
}

function inferProviderIdFromName(name) {
  if (!name) {
    return "";
  }
  const lower = String(name).toLowerCase();
  if (lower.includes("zhipu") || lower.includes("glm") || lower.includes("智谱")) {
    return "zhipu";
  }
  if (lower.includes("gemini")) {
    return "gemini";
  }
  return "";
}
