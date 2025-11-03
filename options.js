const DEFAULT_CONFIG = {
  geminiApiKey: "",
  model: "gemini-2.5-flash",
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
  customPlatforms: []
};

const TEXT_CONTENT = {
  en: {
    title: "image2prompt",
    subtitle: "Configure how prompts are generated and shared.",
    languageLabel: "Language",
    geminiHeading: "Gemini API",
    geminiDescription: "Connect your Gemini API key and pick a model.",
    createNewAPIKey: '👉 Create API Key',
    apiKeyLabel: "API key",
    apiKeyPlaceholder: "Paste your Gemini API key",
    apiKeyHelp: "Your key is saved locally using Chrome sync storage.",
    modelLabel: "Model identifier",
    modelPlaceholder: "gemini-2.5-flash",
    promptHeading: "Prompt Generation",
    promptDescription: "Tune the instruction sent to Gemini.",
    instructionLabel: "Instruction prompt",
    instructionPlaceholder: "Describe how Gemini should craft the text-to-image prompt.",
    promptLanguageLabel: "Prompt language",
    promptLanguageHelp: "Gemini will reply in the selected locale.",
    filterHeading: "Image Filter",
    filterDescription: "Only show the button on images that meet these minimum dimensions.",
    minWidthLabel: "Minimum width (px)",
    minHeightLabel: "Minimum height (px)",
    platformHeading: "AI Platform",
    platformDescription: "Choose where to open the generated prompt.",
    platformLabel: "Platform URL template",
    platformPlaceholder: "https://example.com/create?prompt={{prompt}}",
    platformHelp: "Use {{prompt}} as a placeholder. If omitted, ?prompt=... is appended.",
    autoOpenLabel: "Auto open AI platform",
    autoOpenHelp: "When enabled, opens the configured platform in a new tab once the prompt is ready.",
    platformSelectLabel: "Default platform",
    platformSelectHelp: "Choose which platform opens by default when you tap Open.",
    platformBuiltInGroup: "Popular platforms",
    platformCustomGroup: "My platforms",
    customPlatformsHeading: "Custom platforms",
    customPlatformsEmpty: "You haven't added any custom platforms yet.",
    customNamePlaceholder: "Platform name",
    customUrlPlaceholder: "https://example.com/create?prompt={{prompt}}",
    customAddButton: "Add platform",
    customRemoveButton: "Remove",
    customValidationError: "Enter both a name and URL before adding a platform.",
    customPromptWarning: "Hint: include {{prompt}} in the URL so the text can be inserted automatically.",
    historyHeading: "Generation history",
    historyDescription: "Review previously generated prompts, copy them, or remove entries.",
    historyEmpty: "You haven't generated any prompts yet.",
    historyCopyButton: "Copy prompt",
    historyDeleteButton: "Delete",
    historyCopied: "Prompt copied to clipboard.",
    historyDeleted: "History entry removed.",
    historyTimeLabel: "Generated",
    historyProviderLabel: "Provider",
    historyModelLabel: "Model",
    historyPlatformLabel: "Platform",
    historyImageAlt: "Generated image preview",
    saveButton: "Save settings",
    statusSaved: "Settings saved.",
    statusLanguageError: "Unable to sync language preference."
  },
  zh: {
    title: "图像提示词助手",
    subtitle: "设置提示词的生成方式与跳转平台。",
    languageLabel: "界面语言",
    geminiHeading: "Gemini API",
    geminiDescription: "连接 Gemini API key 并选择模型。",
    createNewAPIKey: '👉 点击创建 API Key',
    apiKeyLabel: "API 密钥",
    apiKeyPlaceholder: "粘贴你的 Gemini API key",
    apiKeyHelp: "密钥仅保存在本地的 Chrome 同步存储中。",
    modelLabel: "模型标识",
    modelPlaceholder: "gemini-2.5-flash",
    promptHeading: "提示词生成",
    promptDescription: "自定义发送给 Gemini 的说明。",
    instructionLabel: "说明提示词",
    instructionPlaceholder: "描述你希望 Gemini 如何编写这段提示词。",
    promptLanguageLabel: "生成语言",
    promptLanguageHelp: "Gemini 会按照所选地区语言返回提示词。",
    filterHeading: "图片筛选",
    filterDescription: "只在满足最低尺寸的图片上显示按钮。",
    minWidthLabel: "最小宽度（像素）",
    minHeightLabel: "最小高度（像素）",
    platformHeading: "AI 平台",
    platformDescription: "选择打开生成提示词的平台。",
    platformLabel: "平台链接模板",
    platformPlaceholder: "https://example.com/create?prompt={{prompt}}",
    platformHelp: "使用 {{prompt}} 作为占位符；如果缺失会自动追加 ?prompt=...",
    autoOpenLabel: "自动打开 AI 平台",
    autoOpenHelp: "开启后，当提示词生成完成会自动在新标签页打开配置的平台。",
    platformSelectLabel: "默认平台",
    platformSelectHelp: "选择点击“打开”时默认使用的平台。",
    platformBuiltInGroup: "常用平台",
    platformCustomGroup: "我的平台",
    customPlatformsHeading: "自定义平台",
    customPlatformsEmpty: "你还没有添加自定义平台。",
    customNamePlaceholder: "平台名称",
    customUrlPlaceholder: "https://example.com/create?prompt={{prompt}}",
    customAddButton: "添加平台",
    customRemoveButton: "删除",
    customValidationError: "请先填写平台名称和链接。",
    customPromptWarning: "提示：请在链接中包含 {{prompt}} 占位符，才能自动填入提示词。",
    historyHeading: "生成历史",
    historyDescription: "查看之前生成的提示词，可复制或删除记录。",
    historyEmpty: "目前还没有生成记录。",
    historyCopyButton: "复制提示词",
    historyDeleteButton: "删除",
    historyCopied: "提示词已复制。",
    historyDeleted: "记录已删除。",
    historyTimeLabel: "生成时间",
    historyProviderLabel: "模型提供商",
    historyModelLabel: "模型",
    historyPlatformLabel: "平台",
    historyImageAlt: "生成图像预览",
    saveButton: "保存设置",
    statusSaved: "设置已保存。",
    statusLanguageError: "无法同步语言偏好。"
  }
};

const PROMPT_LANGUAGES = [
  { code: "en-US", labels: { en: "English (United States)", zh: "英语（美国）" } },
  { code: "en-GB", labels: { en: "English (United Kingdom)", zh: "英语（英国）" } },
  { code: "zh-CN", labels: { en: "Chinese (Simplified, China)", zh: "简体中文（中国）" } },
  { code: "ja-JP", labels: { en: "Japanese (Japan)", zh: "日语（日本）" } },
  { code: "ko-KR", labels: { en: "Korean (South Korea)", zh: "韩语（韩国）" } },
  { code: "fr-FR", labels: { en: "French (France)", zh: "法语（法国）" } },
  { code: "de-DE", labels: { en: "German (Germany)", zh: "德语（德国）" } },
  { code: "es-ES", labels: { en: "Spanish (Spain)", zh: "西班牙语（西班牙）" } },
  { code: "es-MX", labels: { en: "Spanish (Mexico)", zh: "西班牙语（墨西哥）" } },
  { code: "it-IT", labels: { en: "Italian (Italy)", zh: "意大利语（意大利）" } },
  { code: "pt-BR", labels: { en: "Portuguese (Brazil)", zh: "葡萄牙语（巴西）" } },
  { code: "ru-RU", labels: { en: "Russian (Russia)", zh: "俄语（俄罗斯）" } },
  { code: "hi-IN", labels: { en: "Hindi (India)", zh: "印地语（印度）" } },
  { code: "ar-AE", labels: { en: "Arabic (UAE)", zh: "阿拉伯语（阿联酋）" } },
  { code: "nl-NL", labels: { en: "Dutch (Netherlands)", zh: "荷兰语（荷兰）" } },
  { code: "tr-TR", labels: { en: "Turkish (Turkey)", zh: "土耳其语（土耳其）" } },
  { code: "th-TH", labels: { en: "Thai (Thailand)", zh: "泰语（泰国）" } },
  { code: "vi-VN", labels: { en: "Vietnamese (Vietnam)", zh: "越南语（越南）" } },
  { code: "id-ID", labels: { en: "Indonesian (Indonesia)", zh: "印度尼西亚语（印尼）" } },
  { code: "pl-PL", labels: { en: "Polish (Poland)", zh: "波兰语（波兰）" } }
];

const BUILTIN_PLATFORMS = [
  {
    id: "midjourney",
    labels: { en: "Midjourney", zh: "Midjourney" },
    url: "https://www.midjourney.com/?prompt={{prompt}}"
  },
  {
    id: "gemini",
    labels: { en: "Gemini ImageFX", zh: "Gemini ImageFX" },
    url: "https://aistudio.google.com/app/prompts/new?prompt={{prompt}}"
  },
  {
    id: "stable-diffusion",
    labels: { en: "Stable Diffusion Web", zh: "Stable Diffusion Web" },
    url: "https://stablediffusionweb.com/#prompt={{prompt}}"
  },
  {
    id: "jimeng",
    labels: { en: "即梦", zh: "即梦" },
    url: "https://jimeng.jianying.com/?prompt={{prompt}}"
  },
  {
    id: "keling",
    labels: { en: "可灵", zh: "可灵" },
    url: "https://app.klingai.com/?prompt={{prompt}}"
  },
  {
    id: "doubao",
    labels: { en: "Doubao", zh: "豆包" },
    url: "https://www.doubao.com/chat/create-image?prompt={{prompt}}"
  },
  {
    id: "hailuo",
    labels: { en: "Hailuo AI", zh: "海螺AI" },
    url: "https://hailuoai.com/create?prompt={{prompt}}"
  }
];

let currentLanguage = DEFAULT_CONFIG.language;
let currentPromptLanguageSelection = DEFAULT_CONFIG.promptLanguage;
let promptLanguageSelectEl = null;
let platformSelectEl = null;
let customListEl = null;
let customEmptyEl = null;
let customNameInput = null;
let customUrlInput = null;
let customAddButton = null;
let statusNode = null;
let customPlatformsState = [...DEFAULT_CONFIG.customPlatforms];
let selectedPlatformId = DEFAULT_CONFIG.selectedPlatformId;
let formEl = null;
let selectedPlatformLabel = DEFAULT_CONFIG.selectedPlatformLabel;
const HISTORY_STORAGE_KEY = "generationHistory";
let generationHistoryState = [];
let historyListEl = null;
let historyEmptyEl = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("options-form");
  const statusEl = document.getElementById("options-status");
  statusNode = statusEl;
  formEl = form;
  const languageButtons = Array.from(
    document.querySelectorAll(".language-switch__btn")
  );

  platformSelectEl = document.querySelector("select[name='selectedPlatform']");
  customListEl = document.querySelector(".platform-custom__list");
  customEmptyEl = document.querySelector(".platform-custom__empty");
  customNameInput = document.querySelector("input[name='customPlatformName']");
  customUrlInput = document.querySelector("input[name='customPlatformUrl']");
  customAddButton = document.querySelector(".platform-custom__add");
  historyListEl = document.querySelector(".history-list");
  historyEmptyEl = document.querySelector(".history-empty");

  promptLanguageSelectEl = form?.promptLanguage || null;
  if (promptLanguageSelectEl) {
    promptLanguageSelectEl.addEventListener("change", (event) => {
      const value = event.target.value;
      currentPromptLanguageSelection = normalizePromptLanguage(value);
    });
  }

  if (platformSelectEl) {
    platformSelectEl.addEventListener("change", (event) => {
      selectedPlatformId = normalizePlatformId(event.target.value);
      selectedPlatformLabel = getPlatformLabelById(selectedPlatformId);
      syncPlatformUrlWithSelection(form);
    });
  }

  if (customAddButton) {
    customAddButton.addEventListener("click", () => {
      handleAddCustomPlatform(form, statusEl);
    });
  }

  if (historyListEl) {
    historyListEl.addEventListener("click", handleHistoryListClick);
  }

  applyLanguage(currentLanguage);
  updateLanguageButtons(languageButtons);
  bindLanguageButtons(languageButtons, statusEl);

  restoreOptions(form, statusEl);
  loadGenerationHistory();

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") {
      return;
    }
    if (HISTORY_STORAGE_KEY in changes) {
      const updated = changes[HISTORY_STORAGE_KEY]?.newValue;
      generationHistoryState = Array.isArray(updated)
        ? updated.map(normalizeHistoryEntry).filter(Boolean)
        : [];
      renderHistory();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveOptions(form, statusEl);
  });
});

function bindLanguageButtons(buttons, statusEl) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = normalizeLanguage(btn.dataset.lang);
      handleLanguageChange(lang, statusEl, buttons);
    });
  });
}

function handleLanguageChange(lang, statusEl, buttons) {
  if (lang === currentLanguage) {
    return;
  }
  currentLanguage = lang;
  applyLanguage(currentLanguage);
  updateLanguageButtons(buttons);
  persistLanguage(statusEl);
}

function persistLanguage(statusEl) {
  chrome.storage.sync.set({ language: currentLanguage }, () => {
    if (chrome.runtime.lastError) {
      displayStatus(statusEl, translate("statusLanguageError"), true);
    }
  });
}

function restoreOptions(form, statusEl) {
  chrome.storage.sync.get(DEFAULT_CONFIG, (items) => {
    if (chrome.runtime.lastError) {
      displayStatus(statusEl, chrome.runtime.lastError.message, true);
      return;
    }

    currentLanguage = normalizeLanguage(items.language);
    currentPromptLanguageSelection = normalizePromptLanguage(
      items.promptLanguage
    );
    customPlatformsState = Array.isArray(items.customPlatforms)
      ? items.customPlatforms
        .map(sanitizeCustomPlatform)
        .filter(Boolean)
      : [];
    selectedPlatformId = normalizePlatformId(items.selectedPlatformId);
    selectedPlatformLabel = items.selectedPlatformLabel || getPlatformLabelById(selectedPlatformId);
    applyLanguage(currentLanguage);
    updateLanguageButtons(
      Array.from(document.querySelectorAll(".language-switch__btn"))
    );

    form.geminiApiKey.value = items.geminiApiKey || "";
    form.model.value = items.model || DEFAULT_CONFIG.model;
    form.promptInstruction.value =
      items.promptInstruction || DEFAULT_CONFIG.promptInstruction;
    form.platformUrl.value =
      items.platformUrl || DEFAULT_CONFIG.platformUrl;
    form.minImageWidth.value = Number(
      items.minImageWidth ?? DEFAULT_CONFIG.minImageWidth
    );
    form.minImageHeight.value = Number(
      items.minImageHeight ?? DEFAULT_CONFIG.minImageHeight
    );
    if (form.autoOpenPlatform) {
      form.autoOpenPlatform.checked = items.autoOpenPlatform !== false;
    }

    if (promptLanguageSelectEl) {
      promptLanguageSelectEl.value = currentPromptLanguageSelection;
    }
    renderCustomPlatforms();
    renderPlatformOptions();
    if (platformSelectEl) {
      platformSelectEl.value = normalizePlatformId(selectedPlatformId);
    }
    syncPlatformUrlWithSelection(form, { preserveExisting: true });
  });
}

function saveOptions(form, statusEl) {
  const payload = {
    geminiApiKey: form.geminiApiKey.value.trim(),
    model: form.model.value.trim() || DEFAULT_CONFIG.model,
    promptInstruction: form.promptInstruction.value.trim(),
    platformUrl: form.platformUrl.value.trim(),
    minImageWidth: clampToNumber(
      form.minImageWidth.value,
      DEFAULT_CONFIG.minImageWidth
    ),
    minImageHeight: clampToNumber(
      form.minImageHeight.value,
      DEFAULT_CONFIG.minImageHeight
    ),
    promptLanguage: normalizePromptLanguage(
      form.promptLanguage?.value ?? DEFAULT_CONFIG.promptLanguage
    ),
    autoOpenPlatform: form.autoOpenPlatform?.checked ?? true,
    language: currentLanguage
  };
  currentPromptLanguageSelection = payload.promptLanguage;
  selectedPlatformId = normalizePlatformId(selectedPlatformId);

  if (selectedPlatformId.startsWith("custom-")) {
    const index = customPlatformsState.findIndex((item) => item.id === selectedPlatformId);
    if (index !== -1) {
      customPlatformsState[index] = {
        ...customPlatformsState[index],
        url: payload.platformUrl
      };
    }
  }

  payload.selectedPlatformId = selectedPlatformId;
  payload.selectedPlatformLabel = selectedPlatformLabel;
  payload.customPlatforms = customPlatformsState.map(({ id, name, url }) => ({
    id,
    name,
    url
  }));

  renderCustomPlatforms();
  renderPlatformOptions();
  if (platformSelectEl) {
    platformSelectEl.value = selectedPlatformId;
  }

  chrome.storage.sync.set(payload, () => {
    if (chrome.runtime.lastError) {
      displayStatus(statusEl, chrome.runtime.lastError.message, true);
    } else {
      displayStatus(statusEl, translate("statusSaved"));
    }
  });
}

function applyLanguage(lang) {
  const normalized = normalizeLanguage(lang);
  const dictionary = TEXT_CONTENT[normalized] || TEXT_CONTENT.en;

  document.documentElement.lang = normalized === "zh" ? "zh-CN" : "en";
  document.title = dictionary.title;
  renderPromptLanguageOptions(promptLanguageSelectEl);
  renderCustomPlatforms();
  renderPlatformOptions();
  syncPlatformUrlWithSelection(formEl, { preserveExisting: true });
  renderHistory();

  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) {
      return;
    }
    const translation =
      dictionary[key] ?? TEXT_CONTENT.en[key] ?? key;
    const attr = el.dataset.i18nAttr;
    if (attr) {
      el.setAttribute(attr, translation);
    } else {
      el.textContent = translation;
    }
  });
}

function updateLanguageButtons(buttons) {
  buttons.forEach((btn) => {
    if (btn.dataset.lang === currentLanguage) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });
}

function normalizeLanguage(value) {
  return value === "zh" ? "zh" : "en";
}

function normalizePromptLanguage(value) {
  const match = PROMPT_LANGUAGES.find((entry) => entry.code === value);
  return match ? match.code : DEFAULT_CONFIG.promptLanguage;
}

function translate(key) {
  const dictionary = TEXT_CONTENT[currentLanguage] || TEXT_CONTENT.en;
  return dictionary[key] ?? TEXT_CONTENT.en[key] ?? key;
}

function clampToNumber(value, fallback) {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
}

function displayStatus(target, message, isError = false) {
  if (!target) {
    return;
  }
  target.textContent = message;
  target.style.color = isError ? "#f87171" : "rgba(37, 99, 235, 0.85)";
  setTimeout(() => {
    target.textContent = "";
    target.style.color = "";
  }, 3600);
}

function renderPromptLanguageOptions(select) {
  if (!select) {
    return;
  }
  const targetValue = normalizePromptLanguage(currentPromptLanguageSelection);
  const frag = document.createDocumentFragment();
  PROMPT_LANGUAGES.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.code;
    option.textContent =
      entry.labels[currentLanguage] ?? entry.labels.en ?? entry.code;
    frag.appendChild(option);
  });
  select.innerHTML = "";
  select.appendChild(frag);
  select.value = targetValue;
}

function renderPlatformOptions() {
  if (!platformSelectEl) {
    return;
  }

  const fragment = document.createDocumentFragment();

  const builtinGroup = document.createElement("optgroup");
  builtinGroup.label = translate("platformBuiltInGroup");
  BUILTIN_PLATFORMS.forEach((platform) => {
    const option = document.createElement("option");
    option.value = platform.id;
    option.text = getPlatformLabel(platform);
    builtinGroup.appendChild(option);
  });
  fragment.appendChild(builtinGroup);

  if (customPlatformsState.length > 0) {
    const customGroup = document.createElement("optgroup");
    customGroup.label = translate("platformCustomGroup");
    customPlatformsState.forEach((platform) => {
      const option = document.createElement("option");
      option.value = platform.id;
      option.text = platform.name;
      customGroup.appendChild(option);
    });
    fragment.appendChild(customGroup);
  }

  const normalizedId = normalizePlatformId(selectedPlatformId);
  selectedPlatformId = normalizedId;
  selectedPlatformLabel = getPlatformLabelById(normalizedId);
  platformSelectEl.innerHTML = "";
  platformSelectEl.appendChild(fragment);
  platformSelectEl.value = normalizedId;
}

function renderCustomPlatforms() {
  if (!customListEl || !customEmptyEl) {
    return;
  }

  customListEl.innerHTML = "";

  if (customPlatformsState.length === 0) {
    customEmptyEl.hidden = false;
    return;
  }

  customEmptyEl.hidden = true;
  customPlatformsState.forEach((platform) => {
    const item = document.createElement("li");
    item.className = "platform-custom__item";

    const info = document.createElement("div");
    info.className = "platform-custom__info";
    info.textContent = `${platform.name} — ${platform.url}`;

    const actions = document.createElement("div");
    actions.className = "platform-custom__actions";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "platform-custom__remove";
    removeBtn.textContent = translate("customRemoveButton");
    removeBtn.addEventListener("click", () => removeCustomPlatform(platform.id));

    actions.appendChild(removeBtn);
    item.appendChild(info);
    item.appendChild(actions);
    customListEl.appendChild(item);
  });
}

function handleAddCustomPlatform(form, statusEl) {
  const name = customNameInput?.value?.trim() ?? "";
  const url = customUrlInput?.value?.trim() ?? "";

  if (!name || !url) {
    displayStatus(statusEl || statusNode, translate("customValidationError"), true);
    return;
  }

  const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const entry = sanitizeCustomPlatform({ id, name, url });
  if (!entry) {
    displayStatus(statusEl || statusNode, translate("customValidationError"), true);
    return;
  }
  customPlatformsState.push(entry);
  if (!entry.url.includes("{{prompt}}")) {
    displayStatus(statusEl || statusNode, translate("customPromptWarning"));
  }
  customNameInput.value = "";
  customUrlInput.value = "";
  selectedPlatformId = id;
  selectedPlatformLabel = entry.name;

  renderCustomPlatforms();
  renderPlatformOptions();
  if (platformSelectEl) {
    platformSelectEl.value = selectedPlatformId;
  }
  syncPlatformUrlWithSelection(form, { preserveExisting: false });
}

function removeCustomPlatform(id) {
  const index = customPlatformsState.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
  customPlatformsState.splice(index, 1);
  if (selectedPlatformId === id) {
    selectedPlatformId = normalizePlatformId(DEFAULT_CONFIG.selectedPlatformId);
    selectedPlatformLabel = getPlatformLabelById(selectedPlatformId);
    syncPlatformUrlWithSelection(formEl, { preserveExisting: false });
  }
  renderCustomPlatforms();
  renderPlatformOptions();
  if (platformSelectEl) {
    platformSelectEl.value = selectedPlatformId;
  }
}

function syncPlatformUrlWithSelection(form, options = {}) {
  if (!form || !form.platformUrl) {
    return;
  }
  const { preserveExisting = false } = options;
  const field = form.platformUrl;
  selectedPlatformId = normalizePlatformId(selectedPlatformId);
  const platform = getPlatformById(selectedPlatformId);
  selectedPlatformLabel = getPlatformLabelById(selectedPlatformId);
  if (!platform) {
    return;
  }
  if (!preserveExisting || !field.value) {
    field.value = platform.url;
  }
}

function normalizePlatformId(value) {
  if (BUILTIN_PLATFORMS.some((platform) => platform.id === value)) {
    return value;
  }
  if (customPlatformsState.some((platform) => platform.id === value)) {
    return value;
  }
  return BUILTIN_PLATFORMS[0].id;
}

function loadGenerationHistory() {
  chrome.storage.local.get({ [HISTORY_STORAGE_KEY]: [] }, (items) => {
    if (chrome.runtime.lastError) {
      console.warn("[Image2Prompt] Unable to load history:", chrome.runtime.lastError);
      return;
    }
    const list = items?.[HISTORY_STORAGE_KEY];
    generationHistoryState = Array.isArray(list)
      ? list.map(normalizeHistoryEntry).filter(Boolean)
      : [];
    renderHistory();
  });
}

function renderHistory() {
  if (!historyListEl || !historyEmptyEl) {
    return;
  }
  historyListEl.innerHTML = "";
  if (!generationHistoryState.length) {
    historyEmptyEl.hidden = false;
    historyListEl.hidden = true;
    return;
  }
  historyEmptyEl.hidden = true;
  historyListEl.hidden = false;
  const sorted = [...generationHistoryState].sort(
    (a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0)
  );
  sorted.forEach((entry) => {
    const node = buildHistoryEntryNode(entry);
    if (node) {
      historyListEl.appendChild(node);
    }
  });
}

function buildHistoryEntryNode(entry) {
  if (!entry) {
    return null;
  }
  const li = document.createElement("li");
  li.className = "history-entry";
  li.dataset.entryId = entry.id;

  const preview = document.createElement("div");
  preview.className = "history-entry__preview";
  if (entry.imageDataUrl) {
    const img = document.createElement("img");
    img.src = entry.imageDataUrl;
    img.alt = entry.imageAlt || translate("historyImageAlt");
    preview.appendChild(img);
  } else {
    const placeholder = document.createElement("span");
    placeholder.textContent = translate("historyImageAlt");
    placeholder.style.fontSize = "11px";
    placeholder.style.opacity = "0.7";
    preview.appendChild(placeholder);
  }

  const body = document.createElement("div");
  body.className = "history-entry__body";

  const meta = document.createElement("div");
  meta.className = "history-entry__meta";
  const timeSpan = document.createElement("span");
  timeSpan.textContent = `${translate("historyTimeLabel")}: ${formatHistoryTimestamp(entry.createdAt)}`;

  const providerSpan = document.createElement("span");
  providerSpan.textContent = `${translate("historyProviderLabel")}: ${entry.provider || ""}`;

  const modelSpan = document.createElement("span");
  modelSpan.textContent = `${translate("historyModelLabel")}: ${entry.model || ""}`;

  const platformSpan = document.createElement("span");
  const platformLabel = entry.platformName || entry.platformUrl || "";
  if (entry.platformUrl) {
    platformSpan.textContent = `${translate("historyPlatformLabel")}: `;
    const link = document.createElement("a");
    link.href = entry.platformUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = platformLabel;
    platformSpan.appendChild(link);
  } else {
    platformSpan.textContent = `${translate("historyPlatformLabel")}: ${platformLabel}`;
  }

  meta.appendChild(timeSpan);
  meta.appendChild(providerSpan);
  meta.appendChild(modelSpan);
  meta.appendChild(platformSpan);

  const prompt = document.createElement("div");
  prompt.className = "history-entry__prompt";
  prompt.textContent = entry.prompt || "";

  const actions = document.createElement("div");
  actions.className = "history-entry__actions";

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.dataset.action = "copy";
  copyButton.dataset.entryId = entry.id;
  copyButton.textContent = translate("historyCopyButton");

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.entryId = entry.id;
  deleteButton.textContent = translate("historyDeleteButton");

  actions.appendChild(copyButton);
  actions.appendChild(deleteButton);

  body.appendChild(meta);
  body.appendChild(prompt);
  body.appendChild(actions);

  li.appendChild(preview);
  li.appendChild(body);
  return li;
}

function handleHistoryListClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const entryId = button.dataset.entryId;
  const action = button.dataset.action;
  if (action === "copy") {
    copyHistoryPrompt(entryId);
  } else if (action === "delete") {
    deleteHistoryEntry(entryId);
  }
}

async function copyHistoryPrompt(entryId) {
  const entry = generationHistoryState.find((item) => item.id === entryId);
  if (!entry) {
    return;
  }
  try {
    await writeClipboardText(entry.prompt || "");
    displayStatus(statusNode, translate("historyCopied"));
  } catch (error) {
    displayStatus(statusNode, error.message, true);
  }
}

function deleteHistoryEntry(entryId) {
  const index = generationHistoryState.findIndex((item) => item.id === entryId);
  if (index === -1) {
    return;
  }
  generationHistoryState.splice(index, 1);
  updateHistoryStorage();
  renderHistory();
  displayStatus(statusNode, translate("historyDeleted"));
}

function updateHistoryStorage() {
  chrome.storage.local.set(
    { [HISTORY_STORAGE_KEY]: generationHistoryState },
    () => {
      if (chrome.runtime.lastError) {
        console.warn("[Image2Prompt] Unable to update history:", chrome.runtime.lastError);
      }
    }
  );
}

function formatHistoryTimestamp(timestamp) {
  const date = timestamp ? new Date(Number(timestamp)) : new Date();
  try {
    return new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  } catch (error) {
    return date.toLocaleString();
  }
}

async function writeClipboardText(text) {
  if (!text) {
    return;
  }
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus({ preventScroll: true });
  textarea.select();
  const succeeded = document.execCommand("copy");
  textarea.remove();
  if (!succeeded) {
    throw new Error("Clipboard permissions denied.");
  }
}

function normalizeHistoryEntry(entry) {
  if (!entry) {
    return null;
  }
  const id = entry.id || `hist-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    id,
    prompt: String(entry.prompt || ""),
    provider: entry.provider || "Gemini",
    model: entry.model || DEFAULT_CONFIG.model,
    platformName: entry.platformName || entry.platformUrl || "",
    platformId: entry.platformId || "",
    platformUrl: entry.platformUrl || "",
    imageDataUrl: typeof entry.imageDataUrl === "string" ? entry.imageDataUrl : "",
    imageAlt: entry.imageAlt || "",
    createdAt: Number(entry.createdAt) || Date.now()
  };
}

function getPlatformById(id) {
  if (!id) {
    return null;
  }
  const builtin = BUILTIN_PLATFORMS.find((platform) => platform.id === id);
  if (builtin) {
    return { ...builtin };
  }
  const custom = customPlatformsState.find((platform) => platform.id === id);
  if (custom) {
    return { ...custom };
  }
  return null;
}

function getPlatformLabelById(id) {
  const platform = getPlatformById(id);
  if (platform?.name) {
    return platform.name;
  }
  if (platform?.labels) {
    return platform.labels[currentLanguage] ?? platform.labels.en ?? id;
  }
  const custom = customPlatformsState.find((item) => item.id === id);
  if (custom?.name) {
    return custom.name;
  }
  const builtin = BUILTIN_PLATFORMS.find((item) => item.id === id);
  if (builtin?.labels) {
    return builtin.labels[currentLanguage] ?? builtin.labels.en ?? id;
  }
  return id || "";
}

function getPlatformLabel(platform) {
  if (!platform) {
    return "";
  }
  return platform.labels?.[currentLanguage] ?? platform.labels?.en ?? platform.name ?? platform.id;
}

function sanitizeCustomPlatform(entry) {
  if (!entry) {
    return null;
  }
  const name = (entry.name || "").trim();
  const url = (entry.url || "").trim();
  if (!name || !url) {
    return null;
  }
  const id = (entry.id || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`).toString();
  return { id, name, url };
}
