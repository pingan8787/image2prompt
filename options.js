const DEFAULT_PROVIDER_ID = "gemini";

const PROVIDER_DEFAULTS = {
  gemini: {
    apiKey: "",
    model: "gemini-2.5-flash"
  },
  zhipu: {
    apiKey: "",
    model: "glm-4v-plus"
  }
};

const LLM_PROVIDERS = [
  {
    id: "gemini",
    labelKey: "providerGeminiLabel",
    descriptionKey: "providerGeminiDescription",
    keyLink: "https://aistudio.google.com/app/api-keys",
    keyLinkLabelKey: "providerGeminiLink",
    defaultModel: PROVIDER_DEFAULTS.gemini.model,
    apiKeyPlaceholderKey: "apiKeyPlaceholderGemini",
    apiKeyHelpKey: "apiKeyHelpGemini",
    modelPlaceholderKey: "modelPlaceholderGemini"
  },
  {
    id: "zhipu",
    labelKey: "providerZhipuLabel",
    descriptionKey: "providerZhipuDescription",
    keyLink: "https://open.bigmodel.cn/usercenter/apikeys",
    keyLinkLabelKey: "providerZhipuLink",
    docsLink: "https://docs.bigmodel.cn/cn/guide/start/model-overview",
    defaultModel: PROVIDER_DEFAULTS.zhipu.model,
    apiKeyPlaceholderKey: "apiKeyPlaceholderZhipu",
    apiKeyHelpKey: "apiKeyHelpZhipu",
    modelPlaceholderKey: "modelPlaceholderZhipu"
  }
];

const DEFAULT_CONFIG = {
  llmProvider: DEFAULT_PROVIDER_ID,
  providerSettings: createDefaultProviderSettings(),
  geminiApiKey: "",
  zhipuApiKey: "",
  model: PROVIDER_DEFAULTS.gemini.model,
  zhipuModel: PROVIDER_DEFAULTS.zhipu.model,
  promptInstruction:
    "You are an assistant that writes high quality text-to-image prompts. Provide a single prompt that can recreate the given image faithfully.",
  platformUrl: "https://chatgpt.com/?prompt={{prompt}}",
  minImageWidth: 256,
  minImageHeight: 256,
  promptLanguage: "en-US",
  removeWatermark: false,
  imageTextTranslationTarget: "",
  language: "en",
  autoOpenPlatform: true,
  selectedPlatformId: "openai",
  selectedPlatformLabel: "OpenAI",
  customPlatforms: [],
  enableCustomPromptInput: false,
  aspectRatio: "auto",
  customAspectRatio: "",
  promptRichness: "standard",
  domainFilters: [],
  buttonIcon: "✎",
  buttonIconColor: "#ffffff",
  buttonBackgroundColor: "#2563eb",
  buttonShape: "circle",
  buttonSize: 32
};

const TEXT_CONTENT = {
  en: {
    title: "image2prompt",
    subtitle: "Configure how prompts are generated and shared.",
    githubCta: "View on GitHub",
    languageLabel: "Language",
    llmHeading: "Model provider",
    llmDescription: "Choose which large language model generates prompts.",
    llmProviderLabel: "AI provider",
    llmProviderHelp: "Each provider stores its own API key and model identifier.",
    providerGeminiLabel: "Google Gemini",
    providerGeminiDescription: "Connect your Gemini API key and pick a model.",
    providerGeminiLink: "👉 Create Gemini API Key",
    providerZhipuLabel: "Zhipu AI",
    providerZhipuDescription: "Use Zhipu's multimodal models to extract prompts from images.",
    providerZhipuLink: "👉 Create Zhipu API Key",
    apiKeyLabel: "API key",
    apiKeyPlaceholderGemini: "Paste your Gemini API key",
    apiKeyPlaceholderZhipu: "Paste your Zhipu API key",
    apiKeyHelpGemini: "Your key is saved locally using Chrome sync storage.",
    apiKeyHelpZhipu: "Your key is saved locally using Chrome sync storage.",
    modelLabel: "Model identifier",
    modelPlaceholderGemini: "gemini-2.5-flash",
    modelPlaceholderZhipu: "glm-4v-plus",
    promptHeading: "Prompt Generation",
    promptDescription: "Tune the guidance sent to the model.",
    instructionLabel: "System prompt",
    instructionPlaceholder: "Describe the base rules the model should follow for every prompt.",
    promptLanguageLabel: "Prompt language",
    promptLanguageHelp: "The model replies in the selected locale.",
    customPromptToggleLabel: "Enable custom instructions dialog",
    customPromptToggleHelp: "Ask for extra instructions before generating a prompt.",
    removeWatermarkLabel: "Remove watermarks",
    removeWatermarkHelp: "Tell the model to remove watermarks/logos from the generated scene.",
    imageTextTranslationLabel: "Translate image text to",
    imageTextTranslationHelp: "Translate any detected text into the selected language before returning the prompt.",
    imageTextTranslationNone: "Keep original language",
    promptRichnessLabel: "Prompt richness",
    promptRichnessHelp: "Control the level of detail in generated prompts. Higher richness produces more descriptive and comprehensive prompts.",
    promptRichnessConcise: "Concise",
    promptRichnessStandard: "Standard",
    promptRichnessDetailed: "Detailed",
    promptRichnessVeryDetailed: "Very detailed",
    customDialogTitle: "Add custom instructions",
    customDialogDescription:
      "Optional: describe per-image tweaks before the model crafts the prompt.",
    customDialogPlaceholder:
      "Example: Replace the background with a neon-lit city skyline.",
    customDialogConfirm: "Generate prompt",
    customDialogCancel: "Cancel",
    aspectRatioLabel: "Image aspect ratio",
    aspectRatioHelp: "Pick a target ratio to merge into the generated prompt.",
    aspectRatioOptionAuto: "Auto-detect",
    aspectRatioOptionCustom: "Custom…",
    customAspectRatioLabel: "Custom aspect ratio",
    customAspectRatioPlaceholder: "e.g. 5:4 or 1024x768",
    customAspectRatioHint: "Use formats like 5:4 or 1024x768.",
    customAspectError: "Enter a custom aspect ratio before saving.",
    customAspectInvalid: "Enter a valid aspect ratio such as 5:4 or 1024x768.",
    domainHeading: "Domain filters",
    domainDescription: "Hide the capture button on pages whose host matches these domains.",
    domainInputPlaceholder: "e.g. example.com",
    domainAddButton: "Add domain",
    domainListEmpty: "You haven't filtered any domains yet.",
    domainInvalidError: "Enter a valid domain like example.com.",
    domainDuplicateError: "Domain is already on your filter list.",
    domainRemoveButton: "Remove",
    localHeading: "Generate prompts from local images",
    localDescription: "Upload any image from your computer and image2prompt will craft a ready-to-use prompt.",
    localUploadHint: "Click to select local images",
    localListEmpty: "You haven't added any local images yet.",
    localGenerateButton: "Generate prompt",
    localGenerating: "Generating…",
    localRemoveButton: "Remove",
    localCopyButton: "Copy prompt",
    localCopied: "Prompt copied.",
    localUploadError: "Unable to read this file.",
    localErrorPrefix: "Failed to generate prompt.",
    localUnnamed: "Untitled image",
    filterHeading: "Image Filter",
    filterDescription: "Only show the button on images that meet these minimum dimensions.",
    minWidthLabel: "Minimum width (px)",
    minHeightLabel: "Minimum height (px)",
    buttonAppearanceHeading: "Capture button",
    buttonAppearanceDescription: "Customize the floating button shown on images.",
    buttonIconLabel: "Button icon",
    buttonIconPlaceholder: "e.g. ✎ or 🎨",
    buttonIconHelp: "Use up to 3 characters or an emoji.",
    buttonIconColorLabel: "Icon color",
    buttonBackgroundColorLabel: "Background color",
    buttonShapeLabel: "Button shape",
    buttonShapeCircle: "Circle",
    buttonShapeRounded: "Rounded square",
    buttonShapeSquare: "Square",
    buttonSizeLabel: "Button size (px)",
    buttonSizeHelp: "Applies to both width and height.",
    buttonAppearanceResetLabel: "Reset to defaults",
    buttonAppearanceResetStatus: "Button appearance reset. Click Save to apply.",
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
    copyFailed: "Unable to copy prompt.",
    historyExportButton: "Export to Excel",
    historyExported: "History exported.",
    historyPromptLabel: "Prompt",
    historyImageColumnLabel: "Image",
    historyTimeLabel: "Generated",
    historyProviderLabel: "Provider",
    historyModelLabel: "Model",
    historyPlatformLabel: "Platform",
    historyImageAlt: "Generated image preview",
    historyCustomInstructionLabel: "Custom instructions",
    imageViewerCloseLabel: "Close image preview",
    tabSettings: "Settings",
    tabHistory: "History",
    tabLocal: "Local images",
    saveButton: "Save settings",
    statusSaved: "Settings saved.",
    statusLanguageError: "Unable to sync language preference."
  },
  zh: {
    title: "图像提示词助手",
    subtitle: "设置提示词的生成方式与跳转平台。",
    githubCta: "访问 GitHub 仓库",
    languageLabel: "界面语言",
    llmHeading: "大模型设置",
    llmDescription: "选择用于生成提示词的大语言模型。",
    llmProviderLabel: "模型提供商",
    llmProviderHelp: "不同提供商可以分别保存自己的 API 密钥和模型名称。",
    providerGeminiLabel: "Google Gemini",
    providerGeminiDescription: "连接 Gemini API key 并选择模型。",
    providerGeminiLink: "👉 创建 Gemini API Key",
    providerZhipuLabel: "智谱 AI",
    providerZhipuDescription: "使用智谱多模态模型从图片中提炼提示词。",
    providerZhipuLink: "👉 创建智谱 API Key",
    apiKeyLabel: "API 密钥",
    apiKeyPlaceholderGemini: "粘贴你的 Gemini API key",
    apiKeyPlaceholderZhipu: "粘贴你的智谱 API key",
    apiKeyHelpGemini: "密钥仅保存在本地的 Chrome 同步存储中。",
    apiKeyHelpZhipu: "密钥仅保存在本地的 Chrome 同步存储中。",
    modelLabel: "模型标识",
    modelPlaceholderGemini: "gemini-2.5-flash",
    modelPlaceholderZhipu: "glm-4v-plus",
    promptHeading: "提示词生成",
    promptDescription: "自定义发送给模型的整体指导。",
    instructionLabel: "系统提示词",
    instructionPlaceholder: "描述模型在每次生成时都需要遵守的规则或风格。",
    promptLanguageLabel: "生成语言",
    promptLanguageHelp: "模型会按照所选的语言返回提示词。",
    customPromptToggleLabel: "启用自定义指令输入",
    customPromptToggleHelp: "生成前先弹出输入框，让你补充额外说明。",
    removeWatermarkLabel: "图片去水印",
    removeWatermarkHelp: "提示模型自动去除或忽略图片上的水印和 Logo，避免生成结果带水印。",
    imageTextTranslationLabel: "图片文本翻译",
    imageTextTranslationHelp: "将图片中的文字翻译成所选语言后再生成提示词。",
    imageTextTranslationNone: "保持原文",
    promptRichnessLabel: "提示词丰富度",
    promptRichnessHelp: "控制生成提示词的详细程度。丰富度越高，生成的提示词越详细、越全面。",
    promptRichnessConcise: "简洁",
    promptRichnessStandard: "标准",
    promptRichnessDetailed: "详细",
    promptRichnessVeryDetailed: "非常详细",
    customDialogTitle: "补充自定义说明",
    customDialogDescription: "（可选）填写本次生成的额外需求，再交给模型生成提示词。",
    customDialogPlaceholder: "示例：把背景改成赛博朋克风格的霓虹城市。",
    customDialogConfirm: "生成提示词",
    customDialogCancel: "取消",
    aspectRatioLabel: "图片比例",
    aspectRatioHelp: "选择要合并到提示词中的目标画面比例。",
    aspectRatioOptionAuto: "自动",
    aspectRatioOptionCustom: "自定义…",
    customAspectRatioLabel: "自定义图片比例",
    customAspectRatioPlaceholder: "例如 5:4 或 1024x768",
    customAspectRatioHint: "格式示例：5:4 或 1024x768。",
    customAspectError: "请选择自定义比例时请填写具体数值。",
    customAspectInvalid: "请输入合法的图片比例，例如 5:4 或 1024x768。",
    domainHeading: "域名过滤",
    domainDescription: "在以下域名的页面中隐藏捕捉按钮。",
    domainInputPlaceholder: "例如 example.com",
    domainAddButton: "添加域名",
    domainListEmpty: "当前还没有添加需要过滤的域名。",
    domainInvalidError: "请输入合法的域名，例如 example.com。",
    domainDuplicateError: "该域名已在过滤列表中。",
    domainRemoveButton: "删除",
    localHeading: "从本地图片生成提示词",
    localDescription: "上传电脑里的图片，image2prompt 会为你生成可用的提示词并复制。",
    localUploadHint: "点击选择本地图片",
    localListEmpty: "目前还没有添加本地图片。",
    localGenerateButton: "生成提示词",
    localGenerating: "生成中…",
    localRemoveButton: "删除",
    localCopyButton: "复制提示词",
    localCopied: "提示词已复制。",
    localUploadError: "读取文件失败。",
    localErrorPrefix: "生成提示词失败。",
    localUnnamed: "未命名图片",
    filterHeading: "图片筛选",
    filterDescription: "只在满足最低尺寸的图片上显示按钮。",
    minWidthLabel: "最小宽度（像素）",
    minHeightLabel: "最小高度（像素）",
    buttonAppearanceHeading: "按钮外观",
    buttonAppearanceDescription: "自定义图片右下角的悬浮按钮样式。",
    buttonIconLabel: "按钮图标",
    buttonIconPlaceholder: "例如 ✎ 或 🎨",
    buttonIconHelp: "支持 1-3 个字符或表情符号。",
    buttonIconColorLabel: "图标颜色",
    buttonBackgroundColorLabel: "背景颜色",
    buttonShapeLabel: "按钮形状",
    buttonShapeCircle: "圆形",
    buttonShapeRounded: "圆角方形",
    buttonShapeSquare: "方形",
    buttonSizeLabel: "按钮尺寸 (px)",
    buttonSizeHelp: "同时作用于宽度和高度。",
    buttonAppearanceResetLabel: "恢复默认样式",
    buttonAppearanceResetStatus: "按钮样式已恢复默认值，记得点击保存。",
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
    copyFailed: "无法复制提示词。",
    historyExportButton: "导出 Excel",
    historyExported: "生成历史已导出。",
    historyPromptLabel: "提示词",
    historyImageColumnLabel: "图片",
    historyTimeLabel: "生成时间",
    historyProviderLabel: "模型提供商",
    historyModelLabel: "模型",
    historyPlatformLabel: "平台",
    historyImageAlt: "生成图像预览",
    historyCustomInstructionLabel: "自定义说明",
    imageViewerCloseLabel: "关闭大图预览",
    tabSettings: "设置",
    tabHistory: "生成历史",
    tabLocal: "本地图片",
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

const BUTTON_SHAPES = ["circle", "rounded", "square"];

const BUILTIN_PLATFORMS = [
  {
    id: "openai",
    labels: { en: "OpenAI", zh: "OpenAI" },
    url: "https://chatgpt.com/?prompt={{prompt}}"
  },
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
let currentImageTextTranslationSelection = DEFAULT_CONFIG.imageTextTranslationTarget;
let promptLanguageSelectEl = null;
let imageTextTranslationSelectEl = null;
let providerSelectEl = null;
let providerApiKeyInput = null;
let providerModelInput = null;
let providerApiKeyHelpEl = null;
let providerInfoContainer = null;
let providerInfoDescriptionEl = null;
let providerInfoPrimaryLink = null;
let providerInfoPrimaryLabel = null;
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
let currentProviderId = DEFAULT_CONFIG.llmProvider || DEFAULT_PROVIDER_ID;
let providerSettingsState = createDefaultProviderSettings();
const HISTORY_STORAGE_KEY = "generationHistory";
let generationHistoryState = [];
let historyListEl = null;
let historyEmptyEl = null;
let tabButtons = [];
let historyContainer = null;
let currentView = "settings";
let viewPanels = [];
let historyExportButton = null;
let aspectRatioSelectEl = null;
let customAspectWrapper = null;
let customAspectInput = null;
let domainFiltersState = [...DEFAULT_CONFIG.domainFilters];
let domainInputEl = null;
let domainAddButton = null;
let domainListEl = null;
let domainEmptyEl = null;
let localImagesState = [];
let localUploadInput = null;
let localListEl = null;
let localEmptyEl = null;
let imageViewerOverlay = null;
let imageViewerImage = null;
let imageViewerCloseBtn = null;
let bodyOverflowBeforeViewer = "";
let buttonAppearanceResetBtn = null;

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
  tabButtons = Array.from(document.querySelectorAll(".options-tab"));
  historyContainer = document.querySelector(".options-history");
  viewPanels = Array.from(document.querySelectorAll("[data-view-panel]"));
  historyExportButton = historyContainer?.querySelector(
    "[data-action='exportHistory']"
  ) || null;
  aspectRatioSelectEl = form?.aspectRatio || null;
  customAspectWrapper = document.querySelector("[data-custom-aspect-wrapper]") || null;
  customAspectInput = form?.customAspectRatio || null;
  toggleCustomAspectVisibility(
    normalizeAspectRatio(aspectRatioSelectEl?.value ?? DEFAULT_CONFIG.aspectRatio) === "custom"
  );
  domainInputEl = form?.domainFilterInput || null;
  domainAddButton = document.querySelector(".domain-filter__add") || null;
  domainListEl = document.querySelector(".domain-filter__list") || null;
  domainEmptyEl = document.querySelector(".domain-filter__empty") || null;
  buttonAppearanceResetBtn = document.querySelector(
    "[data-action='reset-button-appearance']"
  );
  localUploadInput = document.querySelector("input[name='localImageUpload']");
  localListEl = document.querySelector(".local-list");
  localEmptyEl = document.querySelector(".local-empty");
  providerSelectEl = form?.llmProvider || null;
  providerApiKeyInput = form?.providerApiKey || null;
  providerModelInput = form?.providerModel || null;
  providerApiKeyHelpEl = document.querySelector("[data-provider-help='apiKey']");
  providerInfoContainer = document.querySelector("[data-provider-info]") || null;
  providerInfoDescriptionEl = providerInfoContainer?.querySelector(
    ".provider-info__description"
  ) || null;
  providerInfoPrimaryLink = providerInfoContainer?.querySelector(
    ".provider-info__link"
  ) || null;
  providerInfoPrimaryLabel = providerInfoPrimaryLink?.querySelector(
    ".provider-info__label"
  ) || null;
  const sidebarLinks = Array.from(
    document.querySelectorAll(".sidebar-nav a")
  );
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (currentView !== "settings") {
        switchView("settings");
      }
    });
  });

  promptLanguageSelectEl = form?.promptLanguage || null;
  if (promptLanguageSelectEl) {
    promptLanguageSelectEl.addEventListener("change", (event) => {
      const value = event.target.value;
      currentPromptLanguageSelection = normalizePromptLanguage(value);
    });
  }

  imageTextTranslationSelectEl = form?.imageTextTranslationTarget || null;
  if (imageTextTranslationSelectEl) {
    imageTextTranslationSelectEl.addEventListener("change", (event) => {
      const value = event.target.value;
      currentImageTextTranslationSelection =
        normalizeImageTextTranslationTarget(value);
    });
  }

  if (platformSelectEl) {
    platformSelectEl.addEventListener("change", (event) => {
      selectedPlatformId = normalizePlatformId(event.target.value);
      selectedPlatformLabel = getPlatformLabelById(selectedPlatformId);
      syncPlatformUrlWithSelection(form);
    });
  }

  if (aspectRatioSelectEl) {
    aspectRatioSelectEl.addEventListener("change", handleAspectRatioChange);
  }

  if (providerSelectEl) {
    providerSelectEl.addEventListener("change", (event) => {
      const nextProvider = normalizeProviderId(event.target.value);
      persistCurrentProviderInputs(form);
      if (nextProvider === currentProviderId) {
        updateProviderInfoContent();
        updateProviderFieldPlaceholders();
        return;
      }
      currentProviderId = nextProvider;
      syncProviderInputs(form);
      updateProviderInfoContent();
      updateProviderFieldPlaceholders();
    });
  }

  if (customAddButton) {
    customAddButton.addEventListener("click", () => {
      handleAddCustomPlatform(form, statusEl);
    });
  }

  if (domainAddButton) {
    domainAddButton.addEventListener("click", () => {
      handleAddDomainFilter(statusEl);
    });
  }

  if (domainInputEl) {
    domainInputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleAddDomainFilter(statusEl);
      }
    });
  }

  if (domainListEl) {
    domainListEl.addEventListener("click", handleDomainFilterListClick);
  }

  if (localUploadInput) {
    localUploadInput.addEventListener("change", handleLocalUploadChange);
  }

  if (localListEl) {
    localListEl.addEventListener("click", handleLocalListClick);
  }

  setupImageViewer();

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.view || "settings";
      switchView(targetView);
    });
  });
  if (buttonAppearanceResetBtn) {
    buttonAppearanceResetBtn.addEventListener("click", () => {
      resetButtonAppearance(form, statusEl);
    });
  }

  if (historyListEl) {
    historyListEl.addEventListener("click", handleHistoryListClick);
  }

  if (historyExportButton) {
    historyExportButton.addEventListener("click", handleHistoryExportClick);
  }

  applyLanguage(currentLanguage);
  updateLanguageButtons(languageButtons);
  bindLanguageButtons(languageButtons, statusEl);

  restoreOptions(form, statusEl);
  loadGenerationHistory();
  switchView(currentView);

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

function switchView(nextView) {
  const normalized = nextView === "history" ? "history" : "settings";
  const targetView = nextView === "local" ? "local" : normalized;
  currentView = targetView;
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", (button.dataset.view || "settings") === targetView);
  });
  viewPanels.forEach((panel) => {
    const panelView = panel.dataset.viewPanel || "settings";
    panel.hidden = panelView !== targetView;
  });
  if (targetView === "history") {
    renderHistory();
  } else if (targetView === "local") {
    renderLocalImages();
  }
}

function handleHistoryExportClick() {
  if (!generationHistoryState.length) {
    displayStatus(statusNode, translate("historyEmpty"), true);
    return;
  }

  const rows = buildHistoryExportRows(generationHistoryState);

  const tableMarkup = rows
    .map((row, rowIndex) => {
      const cellTag = rowIndex === 0 ? "th" : "td";
      const cells = row
        .map((cell) => {
          const styleAttr = cell && typeof cell === "object" && cell.style
            ? ` style=\"${cell.style}\"`
            : "";
          if (cell && typeof cell === "object" && cell.html) {
            return `<${cellTag}${styleAttr}>${cell.value}</${cellTag}>`;
          }
          const value = cell && typeof cell === "object" ? cell.value : cell;
          return `<${cellTag}${styleAttr}>${escapeForExport(value)}</${cellTag}>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  const htmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8" /></head><body><table>${tableMarkup}</table></body></html>`;
  const blob = new Blob(["\ufeff" + htmlContent], {
    type: "application/vnd.ms-excel"
  });
  triggerDownload(blob, `image2prompt-history-${new Date().toISOString().slice(0, 10)}.xls`);
  displayStatus(statusNode, translate("historyExported"));
}

function handleAspectRatioChange(event) {
  const value = normalizeAspectRatio(event.target.value);
  if (aspectRatioSelectEl) {
    aspectRatioSelectEl.value = value;
  }
  toggleCustomAspectVisibility(value === "custom");
}

function toggleCustomAspectVisibility(show) {
  if (!customAspectWrapper) {
    return;
  }
  const wasHidden = customAspectWrapper.hidden === true;
  customAspectWrapper.hidden = !show;
  customAspectWrapper.style.display = show ? "" : "none";
  if (customAspectInput) {
    customAspectInput.disabled = !show;
    if (show && wasHidden) {
      customAspectInput.focus({ preventScroll: true });
    }
  }
}

function buildHistoryExportRows(entries) {
  const imageCellStyle = "width:120px;height:120px;text-align:center;vertical-align:middle;";
  const header = [
    { value: translate("historyTimeLabel") },
    { value: translate("historyProviderLabel") },
    { value: translate("historyModelLabel") },
    { value: translate("historyPlatformLabel") },
    { value: translate("historyCustomInstructionLabel") },
    { value: translate("historyPromptLabel") },
    { value: translate("historyImageColumnLabel"), style: imageCellStyle }
  ];
  const rows = [header];
  entries.forEach((entry) => {
    const imageCell = buildHistoryImageCell(entry);
    rows.push([
      { value: formatHistoryTimestamp(entry.createdAt) },
      { value: entry.provider || "" },
      { value: entry.model || "" },
      { value: entry.platformName || entry.platformUrl || "" },
      { value: entry.customInstruction || "" },
      { value: entry.prompt || "" },
      imageCell
    ]);
  });
  return rows;
}

function buildHistoryImageCell(entry) {
  const src = entry.imageDataUrl;
  if (src) {
    const alt = escapeForExport(entry.imageAlt || translate("historyImageAlt"));
    const html = `<div style="width:120px;height:120px;overflow:hidden;display:flex;align-items:center;justify-content:center;">
      <img src="${src}" alt="${alt}" width="120" height="120" style="width:100%;height:100%;max-width:120px;max-height:120px;object-fit:contain;display:block;" />
    </div>`;
    return {
      value: html,
      html: true,
      style: "width:120px;height:120px;text-align:center;vertical-align:middle;"
    };
  }
  return { value: entry.imageAlt || translate("historyImageAlt") };
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 0);
}

function escapeForExport(value) {
  if (value == null) {
    return "";
  }
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeAspectRatio(value) {
  const allowed = new Set([
    "auto",
    "21:9",
    "16:9",
    "3:2",
    "4:3",
    "1:1",
    "3:4",
    "2:3",
    "9:16",
    "custom"
  ]);
  return allowed.has(value) ? value : "auto";
}

function handleAddDomainFilter(statusEl) {
  if (!domainInputEl) {
    return;
  }
  const sanitized = sanitizeDomain(domainInputEl.value);
  if (!sanitized) {
    displayStatus(statusEl, translate("domainInvalidError"), true);
    return;
  }
  if (domainFiltersState.includes(sanitized)) {
    displayStatus(statusEl, translate("domainDuplicateError"), true);
    return;
  }
  domainFiltersState.push(sanitized);
  domainFiltersState.sort();
  renderDomainFilters();
  domainInputEl.value = "";
}

function renderDomainFilters() {
  if (!domainListEl || !domainEmptyEl) {
    return;
  }
  domainListEl.innerHTML = "";
  if (!domainFiltersState.length) {
    domainEmptyEl.hidden = false;
    domainListEl.hidden = true;
    return;
  }
  domainEmptyEl.hidden = true;
  domainListEl.hidden = false;
  const fragment = document.createDocumentFragment();
  domainFiltersState.forEach((domain) => {
    const item = document.createElement("li");
    item.className = "domain-filter__item";
    const name = document.createElement("span");
    name.className = "domain-filter__name";
    name.textContent = domain;
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "domain-filter__remove";
    removeBtn.dataset.action = "removeDomain";
    removeBtn.dataset.domain = domain;
    removeBtn.textContent = translate("domainRemoveButton");
    item.append(name, removeBtn);
    fragment.appendChild(item);
  });
  domainListEl.appendChild(fragment);
}

function handleDomainFilterListClick(event) {
  const button = event.target.closest("button[data-action='removeDomain']");
  if (!button) {
    return;
  }
  removeDomainFilter(button.dataset.domain || "");
}

function removeDomainFilter(domain) {
  const index = domainFiltersState.findIndex((item) => item === domain);
  if (index === -1) {
    return;
  }
  domainFiltersState.splice(index, 1);
  renderDomainFilters();
}

function sanitizeDomain(value) {
  if (typeof value !== "string") {
    return "";
  }
  let domain = value.trim().toLowerCase();
  if (!domain) {
    return "";
  }
  domain = domain.replace(/^https?:\/\//i, "");
  domain = domain.replace(/\/.*$/, "");
  domain = domain.replace(/:\d+$/, "");
  domain = domain.replace(/^\.+/, "");
  if (domain.startsWith("www.")) {
    domain = domain.slice(4);
  }
  domain = domain.replace(/\.$/, "");
  if (!domain) {
    return "";
  }
  if (!/^[a-z0-9.-]+$/.test(domain)) {
    return "";
  }
  if (!domain.includes(".") && domain !== "localhost") {
    return "";
  }
  return domain;
}

function sanitizeDomainFilters(list) {
  if (!Array.isArray(list)) {
    return [];
  }
  const unique = new Set();
  list.forEach((item) => {
    const sanitized = sanitizeDomain(item);
    if (sanitized) {
      unique.add(sanitized);
    }
  });
  return Array.from(unique).sort();
}

function handleLocalUploadChange(event) {
  const files = Array.from(event.target.files || []);
  event.target.value = "";
  if (!files.length) {
    return;
  }
  files.forEach((file) => {
    readFileAsDataUrl(file)
      .then((dataUrl) => {
        const [meta, base64 = ""] = dataUrl.split(",");
        const mimeMatch = /^data:(.*?);base64$/.exec(meta || "");
        const mimeType = mimeMatch?.[1] || file.type || "image/png";
        localImagesState.push({
          id: generateLocalImageId(),
          name: file.name || translate("localUnnamed"),
          sizeLabel: formatFileSize(file.size),
          mimeType,
          dataUrl,
          base64,
          prompt: "",
          isGenerating: false,
          error: ""
        });
        renderLocalImages();
      })
      .catch(() => {
        displayStatus(statusNode, translate("localUploadError"), true);
      });
  });
}

function handleLocalListClick(event) {
  const previewImg = event.target.closest(".local-card__preview img");
  if (previewImg?.dataset.fullImage) {
    openImageViewer(previewImg.dataset.fullImage, previewImg.alt || "");
    return;
  }

  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const { action, localId } = button.dataset;
  if (!localId) {
    return;
  }
  if (action === "generateLocal") {
    generatePromptForLocalImage(localId);
  } else if (action === "removeLocal") {
    removeLocalImage(localId);
  } else if (action === "copyLocal") {
    copyLocalPrompt(localId);
  }
}

function setupImageViewer() {
  if (imageViewerOverlay) {
    return;
  }
  const overlay = document.createElement("div");
  overlay.className = "image-viewer";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-hidden", "true");

  const content = document.createElement("div");
  content.className = "image-viewer__content";

  const image = document.createElement("img");
  image.className = "image-viewer__image";
  image.alt = "";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "image-viewer__close";
  closeButton.textContent = "×";

  content.append(image, closeButton);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeImageViewer();
    }
  });
  closeButton.addEventListener("click", closeImageViewer);
  document.addEventListener("keydown", handleViewerKeydown, true);

  imageViewerOverlay = overlay;
  imageViewerImage = image;
  imageViewerCloseBtn = closeButton;
  updateImageViewerLabels();
}

function handleViewerKeydown(event) {
  if (event.key !== "Escape") {
    return;
  }
  if (!imageViewerOverlay?.classList.contains("is-visible")) {
    return;
  }
  event.preventDefault();
  closeImageViewer();
}

function openImageViewer(src, alt) {
  if (!src) {
    return;
  }
  if (!imageViewerOverlay) {
    setupImageViewer();
  }
  if (!imageViewerOverlay || !imageViewerImage) {
    return;
  }
  if (!imageViewerOverlay.classList.contains("is-visible")) {
    bodyOverflowBeforeViewer = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  imageViewerOverlay.classList.add("is-visible");
  imageViewerOverlay.setAttribute("aria-hidden", "false");
  imageViewerImage.src = src;
  imageViewerImage.alt = alt || "";
}

function closeImageViewer() {
  if (!imageViewerOverlay) {
    return;
  }
  imageViewerOverlay.classList.remove("is-visible");
  imageViewerOverlay.setAttribute("aria-hidden", "true");
  if (imageViewerImage) {
    imageViewerImage.src = "";
    imageViewerImage.alt = "";
  }
  document.body.style.overflow = bodyOverflowBeforeViewer || "";
  bodyOverflowBeforeViewer = "";
}

function updateImageViewerLabels() {
  if (imageViewerCloseBtn) {
    imageViewerCloseBtn.setAttribute(
      "aria-label",
      translate("imageViewerCloseLabel")
    );
  }
}

function renderLocalImages() {
  if (!localListEl || !localEmptyEl) {
    return;
  }
  localListEl.innerHTML = "";
  if (!localImagesState.length) {
    localEmptyEl.hidden = false;
    localListEl.hidden = true;
    return;
  }
  localEmptyEl.hidden = true;
  localListEl.hidden = false;
  const fragment = document.createDocumentFragment();
  localImagesState.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "local-card";
    li.dataset.localId = entry.id;

    const preview = document.createElement("div");
    preview.className = "local-card__preview";
    const img = document.createElement("img");
    img.src = entry.dataUrl;
    img.alt = entry.name;
    img.loading = "lazy";
    img.decoding = "async";
    img.dataset.fullImage = entry.dataUrl;
    preview.appendChild(img);

    const body = document.createElement("div");
    body.className = "local-card__body";

    const title = document.createElement("div");
    title.className = "local-card__title";
    const strong = document.createElement("strong");
    strong.textContent = entry.name;
    const meta = document.createElement("span");
    meta.className = "local-card__meta";
    meta.textContent = entry.sizeLabel;
    title.append(strong, meta);

    const actions = document.createElement("div");
    actions.className = "local-card__actions";
    const generateBtn = document.createElement("button");
    generateBtn.type = "button";
    generateBtn.dataset.action = "generateLocal";
    generateBtn.dataset.localId = entry.id;
    generateBtn.textContent = entry.isGenerating
      ? translate("localGenerating")
      : translate("localGenerateButton");
    if (entry.isGenerating) {
      generateBtn.disabled = true;
      generateBtn.style.opacity = "0.6";
    }

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.dataset.action = "removeLocal";
    removeBtn.dataset.localId = entry.id;
    removeBtn.textContent = translate("localRemoveButton");

    actions.append(generateBtn, removeBtn);

    const status = document.createElement("div");
    status.className = "local-card__status";
    if (entry.error) {
      status.classList.add("local-card__status--error");
      status.textContent = entry.error;
    } else if (!entry.prompt) {
      status.textContent = "";
    }

    body.append(title, actions);
    if (entry.error) {
      body.appendChild(status);
    }

    if (entry.prompt) {
      const result = document.createElement("div");
      result.className = "local-card__result";
      const textarea = document.createElement("textarea");
      textarea.className = "local-card__textarea";
      textarea.readOnly = true;
      textarea.value = entry.prompt;
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "local-card__copy";
      copyBtn.dataset.action = "copyLocal";
      copyBtn.dataset.localId = entry.id;
      copyBtn.textContent = translate("localCopyButton");
      result.append(textarea, copyBtn);
      body.appendChild(result);
    }

    li.append(preview, body);
    fragment.appendChild(li);
  });
  localListEl.appendChild(fragment);
}

function removeLocalImage(id) {
  const index = localImagesState.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return;
  }
  localImagesState.splice(index, 1);
  renderLocalImages();
}

async function generatePromptForLocalImage(id) {
  const entry = localImagesState.find((item) => item.id === id);
  if (!entry || entry.isGenerating) {
    return;
  }

  const { cancelled, instruction } = await collectCustomInstructionIfNeeded();
  if (cancelled) {
    return;
  }

  entry.isGenerating = true;
  entry.error = "";
  renderLocalImages();
  try {
    const response = await requestPromptForImage({
      imageUrl: `local://${id}`,
      imageAlt: entry.name,
      imageMimeType: entry.mimeType,
      imageBase64: entry.base64,
      customInstruction: instruction
    });
    if (!response?.success || !response.prompt) {
      const message = response?.error || translate("localErrorPrefix");
      entry.error = message;
      entry.prompt = "";
    } else {
      entry.prompt = response.prompt;
      entry.error = "";
    }
  } catch (error) {
    entry.error = error?.message || translate("localErrorPrefix");
    entry.prompt = "";
  } finally {
    entry.isGenerating = false;
    renderLocalImages();
  }
}

async function collectCustomInstructionIfNeeded() {
  if (!isCustomInstructionDialogEnabled()) {
    return { cancelled: false, instruction: "" };
  }
  const value = await promptForCustomInstructionInput();
  if (value === null) {
    return { cancelled: true, instruction: "" };
  }
  return { cancelled: false, instruction: value };
}

function isCustomInstructionDialogEnabled() {
  if (!formEl?.enableCustomPromptInput) {
    return false;
  }
  return Boolean(formEl.enableCustomPromptInput.checked);
}

function promptForCustomInstructionInput() {
  return new Promise((resolve) => {
    const existing = document.querySelector(".i2p-dialog-backdrop");
    if (existing) {
      existing.remove();
    }

    const backdrop = document.createElement("div");
    backdrop.className = "i2p-dialog-backdrop";

    const dialog = document.createElement("div");
    dialog.className = "i2p-dialog";

    const title = document.createElement("h3");
    title.className = "i2p-dialog__title";
    title.textContent = translate("customDialogTitle");

    const description = document.createElement("p");
    description.className = "i2p-dialog__description";
    description.textContent = translate("customDialogDescription");

    const textarea = document.createElement("textarea");
    textarea.className = "i2p-dialog__textarea";
    textarea.placeholder = translate("customDialogPlaceholder");
    textarea.setAttribute("aria-label", translate("customDialogTitle"));

    const actions = document.createElement("div");
    actions.className = "i2p-dialog__actions";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className =
      "i2p-dialog__button i2p-dialog__button--secondary";
    cancelButton.textContent = translate("customDialogCancel");

    const confirmButton = document.createElement("button");
    confirmButton.type = "button";
    confirmButton.className =
      "i2p-dialog__button i2p-dialog__button--primary";
    confirmButton.textContent = translate("customDialogConfirm");

    actions.append(cancelButton, confirmButton);
    dialog.append(title, description, textarea, actions);
    backdrop.appendChild(dialog);

    const cleanup = (value) => {
      document.removeEventListener("keydown", handleKeydown, true);
      backdrop.remove();
      resolve(value);
    };

    const submit = () => cleanup(textarea.value.trim());
    const cancel = () => cleanup(null);

    const handleKeydown = (event) => {
      if (!dialog.contains(event.target)) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        cancel();
      }
      if (
        event.key === "Enter" &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        event.stopPropagation();
        submit();
      }
    };

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        cancel();
      }
    });
    cancelButton.addEventListener("click", cancel);
    confirmButton.addEventListener("click", submit);

    const host = document.body || document.documentElement;
    if (!host) {
      resolve(null);
      return;
    }

    document.addEventListener("keydown", handleKeydown, true);
    host.appendChild(backdrop);
    requestAnimationFrame(() => {
      textarea.focus();
    });
  });
}

function copyLocalPrompt(id) {
  const entry = localImagesState.find((item) => item.id === id);
  if (!entry?.prompt) {
    return;
  }
  copyText(entry.prompt)
    .then(() => displayStatus(statusNode, translate("localCopied")))
    .catch(() => displayStatus(statusNode, translate("copyFailed"), true));
}

function requestPromptForImage(payload) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "generatePrompt", ...payload },
      (response) => {
        if (chrome.runtime.lastError) {
          resolve({
            success: false,
            error: chrome.runtime.lastError.message
          });
        } else {
          resolve(response);
        }
      }
    );
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function generateLocalImageId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes)) {
    return "";
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function copyText(value) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }
  return Promise.reject(new Error("Clipboard unavailable"));
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
    currentImageTextTranslationSelection = normalizeImageTextTranslationTarget(
      items.imageTextTranslationTarget
    );
    providerSettingsState = sanitizeProviderSettings(
      items.providerSettings,
      items
    );
    currentProviderId = normalizeProviderId(items.llmProvider);
    customPlatformsState = Array.isArray(items.customPlatforms)
      ? items.customPlatforms
        .map(sanitizeCustomPlatform)
        .filter(Boolean)
      : [];
    domainFiltersState = sanitizeDomainFilters(items.domainFilters);
    selectedPlatformId = normalizePlatformId(items.selectedPlatformId);
    selectedPlatformLabel = items.selectedPlatformLabel || getPlatformLabelById(selectedPlatformId);
    applyLanguage(currentLanguage);
    updateLanguageButtons(
      Array.from(document.querySelectorAll(".language-switch__btn"))
    );

    if (providerSelectEl) {
      providerSelectEl.value = currentProviderId;
    }
    syncProviderInputs(form, { force: true });

    form.promptInstruction.value =
      items.promptInstruction || DEFAULT_CONFIG.promptInstruction;
    if (form.enableCustomPromptInput) {
      form.enableCustomPromptInput.checked = items.enableCustomPromptInput === true;
    }
    if (form.removeWatermark) {
      form.removeWatermark.checked = items.removeWatermark === true;
    }
    form.platformUrl.value =
      items.platformUrl || DEFAULT_CONFIG.platformUrl;
    form.minImageWidth.value = Number(
      items.minImageWidth ?? DEFAULT_CONFIG.minImageWidth
    );
    form.minImageHeight.value = Number(
      items.minImageHeight ?? DEFAULT_CONFIG.minImageHeight
    );
    if (form.buttonIcon) {
      form.buttonIcon.value = sanitizeButtonIcon(
        items.buttonIcon ?? DEFAULT_CONFIG.buttonIcon
      );
    }
    if (form.buttonIconColor) {
      form.buttonIconColor.value = sanitizeColorValue(
        items.buttonIconColor ?? DEFAULT_CONFIG.buttonIconColor,
        DEFAULT_CONFIG.buttonIconColor
      );
    }
    if (form.buttonBackgroundColor) {
      form.buttonBackgroundColor.value = sanitizeColorValue(
        items.buttonBackgroundColor ?? DEFAULT_CONFIG.buttonBackgroundColor,
        DEFAULT_CONFIG.buttonBackgroundColor
      );
    }
    if (form.buttonShape) {
      form.buttonShape.value = normalizeButtonShape(items.buttonShape);
    }
    if (form.buttonSize) {
      form.buttonSize.value = clampButtonSizeValue(
        items.buttonSize ?? DEFAULT_CONFIG.buttonSize
      );
    }
    if (form.autoOpenPlatform) {
      form.autoOpenPlatform.checked = items.autoOpenPlatform !== false;
    }
    if (aspectRatioSelectEl) {
      const normalizedRatio = normalizeAspectRatio(items.aspectRatio);
      aspectRatioSelectEl.value = normalizedRatio;
      toggleCustomAspectVisibility(normalizedRatio === "custom");
    }
    if (customAspectInput) {
      customAspectInput.value = items.customAspectRatio || DEFAULT_CONFIG.customAspectRatio;
    }
    if (promptLanguageSelectEl) {
      promptLanguageSelectEl.value = currentPromptLanguageSelection;
    }
    if (imageTextTranslationSelectEl) {
      imageTextTranslationSelectEl.value = currentImageTextTranslationSelection;
    }
    if (form.promptRichness) {
      form.promptRichness.value = normalizePromptRichness(
        items.promptRichness ?? DEFAULT_CONFIG.promptRichness
      );
    }
    updateProviderInfoContent();
    updateProviderFieldPlaceholders();
    renderCustomPlatforms();
    renderPlatformOptions();
    if (platformSelectEl) {
      platformSelectEl.value = normalizePlatformId(selectedPlatformId);
    }
    syncPlatformUrlWithSelection(form, { preserveExisting: true });
    switchView(currentView);
  });
}

function saveOptions(form, statusEl) {
  persistCurrentProviderInputs(form);
  const providerSettings = cloneProviderSettings(providerSettingsState);
  const selectedAspectRatio = normalizeAspectRatio(
    form.aspectRatio?.value ?? DEFAULT_CONFIG.aspectRatio
  );
  let customAspectRatio = "";
  if (selectedAspectRatio === "custom") {
    const rawValue = form.customAspectRatio?.value ?? "";
    const trimmedValue = rawValue.trim();
    if (!trimmedValue) {
      displayStatus(statusEl, translate("customAspectError"), true);
      return;
    }
    const normalizedCustom = trimmedValue
      .replace(/\s+/g, "")
      .replace(/x/gi, ":");
    if (!/^\d+(?:\.\d+)?:\d+(?:\.\d+)?$/.test(normalizedCustom)) {
      displayStatus(statusEl, translate("customAspectInvalid"), true);
      return;
    }
    customAspectRatio = normalizedCustom;
  }

  toggleCustomAspectVisibility(selectedAspectRatio === "custom");
  if (customAspectInput && selectedAspectRatio === "custom") {
    customAspectInput.value = customAspectRatio;
  }

  const payload = {
    llmProvider: currentProviderId,
    providerSettings,
    geminiApiKey: providerSettings.gemini?.apiKey || "",
    zhipuApiKey: providerSettings.zhipu?.apiKey || "",
    model: providerSettings.gemini?.model || PROVIDER_DEFAULTS.gemini.model,
    zhipuModel: providerSettings.zhipu?.model || PROVIDER_DEFAULTS.zhipu.model,
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
    enableCustomPromptInput: form.enableCustomPromptInput?.checked ?? false,
    removeWatermark: form.removeWatermark?.checked ?? DEFAULT_CONFIG.removeWatermark,
    imageTextTranslationTarget: normalizeImageTextTranslationTarget(
      form.imageTextTranslationTarget?.value ??
        DEFAULT_CONFIG.imageTextTranslationTarget
    ),
    promptRichness: normalizePromptRichness(
      form.promptRichness?.value ?? DEFAULT_CONFIG.promptRichness
    ),
    aspectRatio: selectedAspectRatio,
    customAspectRatio,
    buttonIcon: sanitizeButtonIcon(
      form.buttonIcon?.value ?? DEFAULT_CONFIG.buttonIcon
    ),
    buttonIconColor: sanitizeColorValue(
      form.buttonIconColor?.value,
      DEFAULT_CONFIG.buttonIconColor
    ),
    buttonBackgroundColor: sanitizeColorValue(
      form.buttonBackgroundColor?.value,
      DEFAULT_CONFIG.buttonBackgroundColor
    ),
    buttonShape: normalizeButtonShape(form.buttonShape?.value),
    buttonSize: clampButtonSizeValue(
      form.buttonSize?.value ?? DEFAULT_CONFIG.buttonSize
    ),
    language: currentLanguage
  };
  currentPromptLanguageSelection = payload.promptLanguage;
  currentImageTextTranslationSelection = payload.imageTextTranslationTarget;
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
  payload.domainFilters = [...domainFiltersState];
  payload.providerSettings = providerSettings;

  renderCustomPlatforms();
  renderPlatformOptions();
  renderLocalImages();
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
  renderImageTextTranslationOptions(imageTextTranslationSelectEl);
  renderProviderOptions();
  renderCustomPlatforms();
  renderPlatformOptions();
  renderDomainFilters();
  syncPlatformUrlWithSelection(formEl, { preserveExisting: true });
  renderHistory();
  updateProviderInfoContent();
  updateProviderFieldPlaceholders();

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

  if (aspectRatioSelectEl) {
    const currentRatio = normalizeAspectRatio(aspectRatioSelectEl.value);
    toggleCustomAspectVisibility(currentRatio === "custom");
  }

  updateImageViewerLabels();
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

function normalizeImageTextTranslationTarget(value) {
  if (!value) {
    return DEFAULT_CONFIG.imageTextTranslationTarget;
  }
  const match = PROMPT_LANGUAGES.find((entry) => entry.code === value);
  return match ? match.code : DEFAULT_CONFIG.imageTextTranslationTarget;
}

function normalizePromptRichness(value) {
  const allowed = new Set(["concise", "standard", "detailed", "very-detailed"]);
  if (typeof value === "string" && allowed.has(value)) {
    return value;
  }
  return DEFAULT_CONFIG.promptRichness;
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

function resetButtonAppearance(form, statusEl) {
  if (!form) {
    return;
  }
  if (form.buttonIcon) {
    form.buttonIcon.value = DEFAULT_CONFIG.buttonIcon;
  }
  if (form.buttonIconColor) {
    form.buttonIconColor.value = DEFAULT_CONFIG.buttonIconColor;
  }
  if (form.buttonBackgroundColor) {
    form.buttonBackgroundColor.value = DEFAULT_CONFIG.buttonBackgroundColor;
  }
  if (form.buttonShape) {
    form.buttonShape.value = DEFAULT_CONFIG.buttonShape;
  }
  if (form.buttonSize) {
    form.buttonSize.value = DEFAULT_CONFIG.buttonSize;
  }
  displayStatus(statusEl, translate("buttonAppearanceResetStatus"));
}

function sanitizeButtonIcon(value, fallback = DEFAULT_CONFIG.buttonIcon) {
  if (typeof value !== "string") {
    return fallback;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return fallback;
  }
  const glyphs = Array.from(trimmed);
  return glyphs.slice(0, 3).join("") || fallback;
}

function sanitizeColorValue(value, fallback = DEFAULT_CONFIG.buttonIconColor) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
      return trimmed.toLowerCase();
    }
  }
  return fallback;
}

function normalizeButtonShape(value) {
  return BUTTON_SHAPES.includes(value) ? value : DEFAULT_CONFIG.buttonShape;
}

function clampButtonSizeValue(value, fallback = DEFAULT_CONFIG.buttonSize) {
  const parsed = Number(value);
  if (Number.isFinite(parsed)) {
    const clamped = Math.min(Math.max(parsed, 20), 80);
    return clamped;
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

function renderImageTextTranslationOptions(select) {
  if (!select) {
    return;
  }
  const targetValue = normalizeImageTextTranslationTarget(
    currentImageTextTranslationSelection
  );
  const frag = document.createDocumentFragment();
  const noneOption = document.createElement("option");
  noneOption.value = "";
  noneOption.textContent = translate("imageTextTranslationNone");
  frag.appendChild(noneOption);
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

function renderProviderOptions() {
  if (!providerSelectEl) {
    return;
  }

  const fragment = document.createDocumentFragment();
  LLM_PROVIDERS.forEach((provider) => {
    const option = document.createElement("option");
    option.value = provider.id;
    option.textContent = translate(provider.labelKey);
    fragment.appendChild(option);
  });

  const normalizedId = normalizeProviderId(currentProviderId);
  currentProviderId = normalizedId;
  providerSelectEl.innerHTML = "";
  providerSelectEl.appendChild(fragment);
  providerSelectEl.value = normalizedId;
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

function syncProviderInputs(form, options = {}) {
  const { force = false } = options;
  const entry = getProviderSettingsFromState(currentProviderId);

  if (providerApiKeyInput) {
    if (force || document.activeElement !== providerApiKeyInput) {
      providerApiKeyInput.value = entry.apiKey || "";
    }
  }

  if (providerModelInput) {
    if (force || document.activeElement !== providerModelInput) {
      providerModelInput.value = entry.model || "";
    }
  }
}

function persistCurrentProviderInputs(form) {
  if (!form) {
    return;
  }
  const entry = getProviderSettingsFromState(currentProviderId);
  const apiKeyValue =
    form.providerApiKey?.value ?? providerApiKeyInput?.value ?? "";
  const modelValue =
    form.providerModel?.value ?? providerModelInput?.value ?? "";
  entry.apiKey = apiKeyValue.trim();
  const descriptor = getProviderDescriptor(currentProviderId);
  const defaultModel =
    descriptor?.defaultModel ??
    PROVIDER_DEFAULTS[currentProviderId]?.model ??
    "";
  entry.model = modelValue.trim() || defaultModel;
  providerSettingsState[currentProviderId] = { ...entry };
}

function updateProviderInfoContent() {
  if (!providerInfoContainer) {
    return;
  }
  const descriptor = getProviderDescriptor(currentProviderId);
  if (!descriptor) {
    providerInfoContainer.hidden = true;
    return;
  }

  providerInfoContainer.hidden = false;

  if (providerInfoDescriptionEl) {
    providerInfoDescriptionEl.textContent = translate(descriptor.descriptionKey);
  }

  if (providerInfoPrimaryLink && providerInfoPrimaryLabel) {
    const linkHref = descriptor.keyLink || "";
    const labelKey = descriptor.keyLinkLabelKey;
    if (linkHref && labelKey) {
      providerInfoPrimaryLink.href = linkHref;
      providerInfoPrimaryLabel.textContent = translate(labelKey);
      providerInfoPrimaryLink.hidden = false;
    } else {
      providerInfoPrimaryLink.hidden = true;
    }
  }
}

function updateProviderFieldPlaceholders() {
  const descriptor = getProviderDescriptor(currentProviderId);
  if (!descriptor) {
    return;
  }

  if (providerApiKeyInput) {
    const placeholderKey = descriptor.apiKeyPlaceholderKey;
    if (placeholderKey) {
      providerApiKeyInput.placeholder = translate(placeholderKey);
    }
  }

  if (providerApiKeyHelpEl) {
    const helpKey = descriptor.apiKeyHelpKey;
    if (helpKey) {
      providerApiKeyHelpEl.textContent = translate(helpKey);
      providerApiKeyHelpEl.hidden = false;
    } else {
      providerApiKeyHelpEl.textContent = "";
      providerApiKeyHelpEl.hidden = true;
    }
  }

  if (providerModelInput) {
    const modelPlaceholderKey = descriptor.modelPlaceholderKey;
    if (modelPlaceholderKey) {
      providerModelInput.placeholder = translate(modelPlaceholderKey);
    }
  }
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
    img.dataset.fullImage = entry.imageDataUrl;
    img.loading = "lazy";
    img.decoding = "async";
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

  body.appendChild(meta);

  const customInstruction = entry.customInstruction
    ? String(entry.customInstruction).trim()
    : "";
  if (customInstruction) {
    const custom = document.createElement("div");
    custom.className = "history-entry__custom";
    const label = document.createElement("span");
    label.className = "history-entry__custom-label";
    label.textContent = `${translate("historyCustomInstructionLabel")}: `;
    const text = document.createElement("span");
    text.textContent = customInstruction;
    custom.appendChild(label);
    custom.appendChild(text);
    body.appendChild(custom);
  }

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

  body.appendChild(prompt);
  body.appendChild(actions);

  li.appendChild(preview);
  li.appendChild(body);
  return li;
}

function handleHistoryListClick(event) {
  const previewImg = event.target.closest(".history-entry__preview img");
  if (previewImg?.dataset.fullImage) {
    openImageViewer(previewImg.dataset.fullImage, previewImg.alt || "");
    return;
  }

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
  const rawProviderName = entry.provider ? String(entry.provider) : "";
  let providerId = entry.providerId ? normalizeProviderId(entry.providerId) : "";
  if (!providerId && rawProviderName) {
    providerId = inferProviderIdFromName(rawProviderName);
  }
  if (!providerId) {
    providerId = DEFAULT_PROVIDER_ID;
  }
  const providerDescriptor = getProviderDescriptor(providerId);
  const providerName =
    rawProviderName ||
    providerDescriptor?.name ||
    PROVIDER_DEFAULTS[providerId]?.name ||
    PROVIDER_DEFAULTS[DEFAULT_PROVIDER_ID].name;
  const defaultModel = PROVIDER_DEFAULTS[providerId]?.model || DEFAULT_CONFIG.model;
  return {
    id,
    prompt: String(entry.prompt || ""),
    provider: providerName,
    providerId,
    model: entry.model ? String(entry.model) : defaultModel,
    platformName: entry.platformName || entry.platformUrl || "",
    platformId: entry.platformId || "",
    platformUrl: entry.platformUrl || "",
    imageDataUrl: typeof entry.imageDataUrl === "string" ? entry.imageDataUrl : "",
    imageAlt: entry.imageAlt || "",
    createdAt: Number(entry.createdAt) || Date.now(),
    customInstruction:
      typeof entry.customInstruction === "string"
        ? entry.customInstruction
        : ""
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

function normalizeProviderId(value) {
  if (!value) {
    return DEFAULT_PROVIDER_ID;
  }
  const id = String(value).toLowerCase();
  const descriptor = LLM_PROVIDERS.find((provider) => provider.id === id);
  return descriptor ? descriptor.id : DEFAULT_PROVIDER_ID;
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

function getProviderDescriptor(providerId) {
  const normalized = normalizeProviderId(providerId);
  return LLM_PROVIDERS.find((provider) => provider.id === normalized) || LLM_PROVIDERS[0];
}

function getProviderSettingsFromState(providerId) {
  const normalized = normalizeProviderId(providerId);
  if (!providerSettingsState[normalized]) {
    providerSettingsState[normalized] = {
      apiKey: PROVIDER_DEFAULTS[normalized]?.apiKey || "",
      model: PROVIDER_DEFAULTS[normalized]?.model || ""
    };
  }
  const entry = providerSettingsState[normalized];
  if (typeof entry.apiKey !== "string") {
    entry.apiKey = entry.apiKey ? String(entry.apiKey) : "";
  }
  if (typeof entry.model !== "string") {
    entry.model = entry.model ? String(entry.model) : PROVIDER_DEFAULTS[normalized]?.model || "";
  }
  return entry;
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

function cloneProviderSettings(settings) {
  return sanitizeProviderSettings(settings || {});
}

function createDefaultProviderSettings() {
  const defaults = {};
  Object.entries(PROVIDER_DEFAULTS).forEach(([id, entry]) => {
    defaults[id] = {
      apiKey: entry.apiKey,
      model: entry.model
    };
  });
  return defaults;
}
