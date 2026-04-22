export const DEFAULT_PROVIDER_ID = "gemini";

const PROVIDER_CATALOG = {
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    labelKey: "providerGeminiLabel",
    descriptionKey: "providerGeminiDescription",
    keyLink: "https://aistudio.google.com/app/api-keys",
    keyLinkLabelKey: "providerGeminiLink",
    docsLink: "https://ai.google.dev/gemini-api/docs/models",
    docsLinkLabelKey: "providerDocsLabel",
    defaultModel: "gemini-2.5-flash",
    apiKeyPlaceholderKey: "apiKeyPlaceholderGemini",
    apiKeyHelpKey: "apiKeyHelpGemini",
    modelPlaceholderKey: "modelPlaceholderGemini",
    models: [
      { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash", tone: "Balanced" },
      { id: "gemini-3-flash-preview", label: "Gemini 3 Flash Preview", tone: "Fast" },
      {
        id: "gemini-3-pro-image-preview",
        label: "Gemini 3 Pro Image Preview",
        tone: "Image-first"
      },
      {
        id: "gemini-3.1-flash-lite-preview",
        label: "Gemini 3.1 Flash Lite Preview",
        tone: "Lightweight"
      },
      {
        id: "gemini-3.1-flash-image-preview",
        label: "Gemini 3.1 Flash Image Preview",
        tone: "Vision"
      },
      {
        id: "gemini-3.1-pro-preview",
        label: "Gemini 3.1 Pro Preview",
        tone: "Highest quality"
      }
    ]
  },
  zhipu: {
    id: "zhipu",
    name: "Zhipu AI",
    labelKey: "providerZhipuLabel",
    descriptionKey: "providerZhipuDescription",
    keyLink: "https://open.bigmodel.cn/usercenter/apikeys",
    keyLinkLabelKey: "providerZhipuLink",
    docsLink: "https://docs.bigmodel.cn/cn/guide/start/model-overview",
    docsLinkLabelKey: "providerDocsLabel",
    defaultModel: "glm-4v-plus",
    apiKeyPlaceholderKey: "apiKeyPlaceholderZhipu",
    apiKeyHelpKey: "apiKeyHelpZhipu",
    modelPlaceholderKey: "modelPlaceholderZhipu",
    models: [
      { id: "glm-4v-plus", label: "GLM-4V Plus", tone: "Stable" },
      { id: "glm-4.6v", label: "GLM-4.6V", tone: "Vision" },
      { id: "glm-5v-turbo", label: "GLM-5V Turbo", tone: "Fast" }
    ]
  }
};

export const PROVIDER_DEFAULTS = Object.freeze(
  Object.fromEntries(
    Object.values(PROVIDER_CATALOG).map((provider) => [
      provider.id,
      Object.freeze({
        name: provider.name,
        model: provider.defaultModel
      })
    ])
  )
);

export function getProviderList() {
  return Object.values(PROVIDER_CATALOG).map((provider) => ({
    ...provider,
    models: provider.models.map((model) => ({ ...model }))
  }));
}

export function getProviderById(value) {
  const id = normalizeProviderId(value);
  const provider = PROVIDER_CATALOG[id] || PROVIDER_CATALOG[DEFAULT_PROVIDER_ID];
  return {
    ...provider,
    models: provider.models.map((model) => ({ ...model }))
  };
}

export function createDefaultProviderSettings() {
  return Object.fromEntries(
    Object.values(PROVIDER_CATALOG).map((provider) => [
      provider.id,
      {
        apiKey: "",
        model: provider.defaultModel
      }
    ])
  );
}

export function normalizeProviderId(value) {
  if (!value) {
    return DEFAULT_PROVIDER_ID;
  }
  const id = String(value).toLowerCase();
  return PROVIDER_CATALOG[id]?.id || DEFAULT_PROVIDER_ID;
}

export function inferProviderIdFromName(name) {
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

export function hasPresetModel(providerId, modelId) {
  if (!modelId) {
    return false;
  }
  const provider = getProviderById(providerId);
  return provider.models.some((model) => model.id === String(modelId).trim());
}
