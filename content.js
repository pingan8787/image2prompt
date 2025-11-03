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

const BUTTON_CLASS = "i2p-button";
const OVERLAY_CLASS = "i2p-overlay";
const DATASET_KEY = "i2pTracked";
const BUTTON_ICON = "✎";

const UI_STRINGS = {
  en: {
    buttonTooltip: "Generate prompt",
    buttonAria: "Generate prompt",
    toastPlatformOpened: "Prompt ready. Opened your configured AI platform in a new tab.",
    toastPlatformManual: "Prompt ready. Use the button below to open your configured AI platform.",
    toastCopiedAuto: "Prompt copied to clipboard.",
    toastAutoCopyFailed: "Couldn't auto-copy the prompt. Use Copy instead.",
    copyButton: "Copy",
    copyButtonAria: "Copy prompt",
    openPlatform: "Open AI platform",
    reopenPlatform: "Reopen platform",
    openButtonAria: "Open AI platform",
    platformNotConfigured: "AI platform URL is not configured.",
    copySuccess: "Prompt copied to clipboard.",
    copyFailed: "Unable to copy to clipboard."
  },
  zh: {
    buttonTooltip: "生成提示词",
    buttonAria: "生成提示词",
    toastPlatformOpened: "提示词已就绪，并在新标签页打开了配置的 AI 平台。",
    toastPlatformManual: "提示词已就绪，点击下方按钮即可打开配置的 AI 平台。",
    toastCopiedAuto: "提示词已复制到剪贴板。",
    toastAutoCopyFailed: "未能自动复制提示词，请点击“复制”按钮。",
    copyButton: "复制",
    copyButtonAria: "复制提示词",
    openPlatform: "打开 AI 平台",
    reopenPlatform: "重新打开 AI 平台",
    openButtonAria: "打开 AI 平台",
    platformNotConfigured: "尚未配置 AI 平台链接。",
    copySuccess: "提示词已复制到剪贴板。",
    copyFailed: "无法复制到剪贴板。"
  }
};

let config = { ...DEFAULT_CONFIG };
const imageState = new WeakMap();

init().catch((error) => {
  console.error("[Image2Prompt] Failed to initialize content script:", error);
});

async function init() {
  await loadConfig();
  watchForConfigChanges();
  observeDomMutations();
  document
    .querySelectorAll("img")
    .forEach((img) => trackImage(img));
}

function loadConfig() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(DEFAULT_CONFIG, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        config = { ...DEFAULT_CONFIG, ...items };
        resolve();
      }
    });
  });
}

function watchForConfigChanges() {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") {
      return;
    }

    let shouldReevaluate = false;
    let shouldUpdateLabels = false;
    for (const [key, change] of Object.entries(changes)) {
      config[key] = change.newValue ?? DEFAULT_CONFIG[key];
      if (key === "minImageWidth" || key === "minImageHeight") {
        shouldReevaluate = true;
      }
      if (key === "language") {
        shouldUpdateLabels = true;
      }
    }

    if (shouldReevaluate) {
      refreshAllImages();
    }
    if (shouldUpdateLabels) {
      updateAllButtonLabels();
    }
  });
}

function observeDomMutations() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        if (node instanceof HTMLImageElement) {
          trackImage(node);
        } else {
          node.querySelectorAll?.("img").forEach((img) => trackImage(img));
        }
      });

      mutation.removedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        if (node instanceof HTMLImageElement) {
          cleanupImage(node);
        } else {
          node.querySelectorAll?.("img").forEach((img) => cleanupImage(img));
        }
      });
    }
  });

  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });
}

function trackImage(img) {
  if (!img || img.dataset[DATASET_KEY]) {
    return;
  }

  img.dataset[DATASET_KEY] = "1";

  let state = imageState.get(img);
  if (!state) {
    state = {
      overlay: null,
      button: null,
      parent: null,
      parentAdjusted: false,
      resizeObserver: null
    };
    imageState.set(img, state);
  }

  const update = () => updateImageOverlay(img);
  const error = () => removeOverlay(img);

  img.addEventListener("load", update, { passive: true });
  img.addEventListener("error", error, { passive: true });

  if (!state.resizeObserver && typeof ResizeObserver !== "undefined") {
    const resizeObserver = new ResizeObserver(() => updateImageOverlay(img));
    resizeObserver.observe(img);
    state.resizeObserver = resizeObserver;
  }

  update();
}

function refreshAllImages() {
  document.querySelectorAll("img").forEach((img) => updateImageOverlay(img));
}

function updateImageOverlay(img) {
  if (!img.isConnected) {
    cleanupImage(img);
    return;
  }

  const { width: effectiveWidth, height: effectiveHeight } =
    getEffectiveDimensions(img);
  const minWidth = Number(config.minImageWidth || 0);
  const minHeight = Number(config.minImageHeight || 0);
  const meetsThreshold =
    effectiveWidth >= minWidth && effectiveHeight >= minHeight;

  if (meetsThreshold) {
    ensureOverlay(img);
  } else {
    removeOverlay(img);
  }
}

function ensureOverlay(img) {
  const parent = img.parentElement;
  if (!parent) {
    return;
  }

  let state = imageState.get(img);
  if (!state) {
    state = {
      overlay: null,
      button: null,
      parent: null,
      parentAdjusted: false,
      resizeObserver: null
    };
    imageState.set(img, state);
  }

  if (state.overlay && state.button) {
    applyButtonLabels(state.button);
    return;
  }

  const parentState = ensureParentPosition(parent);

  const overlay = document.createElement("div");
  overlay.className = OVERLAY_CLASS;

  const button = document.createElement("button");
  button.type = "button";
  button.className = BUTTON_CLASS;
  button.dataset.loading = "false";
  button.classList.remove("is-loading");
  button.removeAttribute("aria-busy");
  applyButtonLabels(button);

  button.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      triggerPrompt(button, img);
    },
    { passive: false }
  );

  overlay.appendChild(button);
  parent.appendChild(overlay);

  state.overlay = overlay;
  state.button = button;
  state.parent = parent;
  state.parentAdjusted = parentState.adjusted;
}

function removeOverlay(img) {
  const state = imageState.get(img);
  if (!state || !state.overlay) {
    return;
  }

  state.overlay.remove();
  if (state.parent) {
    releaseParentPosition(state.parent, state.parentAdjusted);
  }
  state.overlay = null;
  state.button = null;
  state.parent = null;
  state.parentAdjusted = false;
}

function cleanupImage(img) {
  removeOverlay(img);
  if (img && img.dataset) {
    delete img.dataset[DATASET_KEY];
  }
  const state = imageState.get(img);
  if (state?.resizeObserver) {
    try {
      state.resizeObserver.disconnect();
    } catch (error) {
      // ignore disconnect errors
    }
  }
  imageState.delete(img);
}

function ensureParentPosition(parent) {
  const computed = getComputedStyle(parent);
  let adjusted = false;

  const currentCount = Number(parent.dataset.i2pOverlayCount || "0");
  parent.dataset.i2pOverlayCount = String(currentCount + 1);

  if (computed.position === "static") {
    if (!parent.dataset.i2pOriginalPosition) {
      parent.dataset.i2pOriginalPosition = parent.style.position || "";
    }
    parent.style.position = "relative";
    parent.dataset.i2pPositionAdjusted = "true";
    adjusted = true;
  }

  return { adjusted };
}

function releaseParentPosition(parent, wasAdjusted) {
  if (!parent || !parent.dataset) {
    return;
  }

  const currentCount = Number(parent.dataset.i2pOverlayCount || "1");
  const nextCount = Math.max(currentCount - 1, 0);
  parent.dataset.i2pOverlayCount = String(nextCount);

  if (nextCount === 0) {
    delete parent.dataset.i2pOverlayCount;
    if (wasAdjusted || parent.dataset.i2pPositionAdjusted === "true") {
      parent.style.position = parent.dataset.i2pOriginalPosition || "";
      delete parent.dataset.i2pOriginalPosition;
      delete parent.dataset.i2pPositionAdjusted;
    }
  }
}

async function triggerPrompt(button, img) {
  if (button.dataset.loading === "true") {
    return;
  }

  button.dataset.loading = "true";
  button.disabled = true;
  button.classList.add("is-loading");
  button.setAttribute("aria-busy", "true");

  try {
    const imagePayload = await collectImagePayload(img);
    const response = await sendGeneratePromptMessage({
      imageUrl: imagePayload.imageUrl,
      imageAlt: img.alt || "",
      ...(imagePayload.base64
        ? {
            imageMimeType: imagePayload.mimeType,
            imageBase64: imagePayload.base64
          }
        : {})
    });

    if (!response?.success) {
      throw new Error(response?.error || "Unknown error.");
    }

    const prompt = response.prompt || "";
    if (!prompt) {
      throw new Error("Gemini returned an empty prompt.");
    }

    const platformUrl =
      response.platformUrl || buildPlatformUrl(prompt);
    if (!platformUrl) {
      showToast(getUiString("platformNotConfigured"), true);
    }

    const autoCopied = await tryCopyToClipboard(prompt);
    const autoOpened = response.autoOpened === true;

    showPromptToast(prompt, {
      platformAvailable: Boolean(platformUrl),
      autoOpened,
      autoCopied
    });
  } catch (error) {
    console.error("[Image2Prompt] Prompt generation failed:", error);
    showToast(
      `Failed to generate prompt: ${error.message || "Unknown error"}`,
      true
    );
  } finally {
    button.dataset.loading = "false";
    button.disabled = false;
    button.classList.remove("is-loading");
    button.removeAttribute("aria-busy");
  }
}

function sendGeneratePromptMessage(payload) {
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

function showPromptToast(prompt, status = {}) {
  const {
    platformAvailable = false,
    autoOpened = false,
    autoCopied
  } = status;
  const container = ensureToastContainer();

  const toast = document.createElement("div");
  toast.className = "i2p-toast";

  const hasCopyStatus = typeof autoCopied === "boolean";
  if (autoOpened || platformAvailable || hasCopyStatus) {
    const infoWrapper = document.createElement("div");
    infoWrapper.style.display = "flex";
    infoWrapper.style.flexDirection = "column";
    infoWrapper.style.gap = "2px";
    infoWrapper.style.fontWeight = "600";

    if (autoOpened) {
      const platformInfo = document.createElement("span");
      platformInfo.textContent = getUiString("toastPlatformOpened");
      infoWrapper.appendChild(platformInfo);
    } else if (platformAvailable) {
      const manualInfo = document.createElement("span");
      manualInfo.textContent = getUiString("toastPlatformManual");
      infoWrapper.appendChild(manualInfo);
    }

    if (autoCopied === true) {
      const copyInfo = document.createElement("span");
      copyInfo.style.fontWeight = "500";
      copyInfo.textContent = getUiString("toastCopiedAuto");
      infoWrapper.appendChild(copyInfo);
    } else if (autoCopied === false) {
      const copyWarning = document.createElement("span");
      copyWarning.style.fontWeight = "500";
      copyWarning.textContent = getUiString("toastAutoCopyFailed");
      infoWrapper.appendChild(copyWarning);
    }

    toast.appendChild(infoWrapper);
  }

  const text = document.createElement("div");
  text.style.whiteSpace = "pre-wrap";
  text.style.wordBreak = "break-word";
  text.textContent = prompt;

  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.gap = "8px";

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.textContent = getUiString("copyButton");
  copyBtn.setAttribute("aria-label", getUiString("copyButtonAria"));
  copyBtn.addEventListener("click", () => {
    copyToClipboard(prompt).then(
      () => showToast(getUiString("copySuccess")),
      () => showToast(getUiString("copyFailed"), true)
    );
  });

  actions.appendChild(copyBtn);

  const openBtn = document.createElement("button");
  openBtn.type = "button";
  openBtn.textContent = autoOpened
    ? getUiString("reopenPlatform")
    : getUiString("openPlatform");
  openBtn.setAttribute("aria-label", getUiString("openButtonAria"));
  if (!platformAvailable) {
    openBtn.disabled = true;
    openBtn.style.opacity = "0.6";
    openBtn.style.cursor = "not-allowed";
  }
  openBtn.addEventListener("click", () => {
    if (!platformAvailable) {
      showToast(getUiString("platformNotConfigured"), true);
      return;
    }
    const url = buildPlatformUrl(prompt);
    if (url) {
      window.open(url, "_blank", "noopener");
    } else {
      showToast(getUiString("platformNotConfigured"), true);
    }
  });
  actions.appendChild(openBtn);

  toast.appendChild(text);
  toast.appendChild(actions);

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 8000);
}

function showToast(message, isError = false) {
  const container = ensureToastContainer();
  const toast = document.createElement("div");
  toast.className = isError ? "i2p-toast i2p-toast--error" : "i2p-toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

async function tryCopyToClipboard(text) {
  const doc = typeof document !== "undefined" ? document : null;
  if (doc?.hasFocus && !doc.hasFocus()) {
    return false;
  }
  try {
    await copyToClipboard(text);
    return true;
  } catch (error) {
    return false;
  }
}

function updateAllButtonLabels() {
  document
    .querySelectorAll(`.${BUTTON_CLASS}`)
    .forEach((button) => applyButtonLabels(button));
}

function applyButtonLabels(button) {
  if (!button) {
    return;
  }
  const tooltip = getUiString("buttonTooltip");
  const ariaLabel = getUiString("buttonAria");
  button.title = tooltip;
  button.setAttribute("aria-label", ariaLabel);
  if (!button.classList.contains("is-loading")) {
    button.dataset.loading = button.dataset.loading || "false";
  }
  button.textContent = "";
  let icon = button.querySelector(".i2p-button__icon");
  if (!icon) {
    icon = document.createElement("span");
    icon.className = "i2p-button__icon";
    button.appendChild(icon);
  }
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = BUTTON_ICON;
}

function getUiLanguage() {
  return config.language === "zh" ? "zh" : "en";
}

function getUiString(key) {
  const language = getUiLanguage();
  return UI_STRINGS[language]?.[key] ?? UI_STRINGS.en[key] ?? "";
}

function getEffectiveDimensions(img) {
  if (!img) {
    return { width: 0, height: 0 };
  }
  const rect =
    typeof img.getBoundingClientRect === "function"
      ? img.getBoundingClientRect()
      : { width: 0, height: 0 };
  const displayWidth =
    Math.round(rect.width || img.offsetWidth || img.clientWidth || 0);
  const displayHeight =
    Math.round(rect.height || img.offsetHeight || img.clientHeight || 0);
  const naturalWidth = img.naturalWidth || 0;
  const naturalHeight = img.naturalHeight || 0;

  return {
    width: displayWidth > 0 ? displayWidth : naturalWidth,
    height: displayHeight > 0 ? displayHeight : naturalHeight
  };
}

function ensureToastContainer() {
  let container = document.querySelector(".i2p-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "i2p-toast-container";
    document.body.appendChild(container);
  }
  return container;
}

async function copyToClipboard(text) {
  const doc = typeof document !== "undefined" ? document : null;
  const canUseAsyncClipboard =
    navigator.clipboard?.writeText &&
    (!doc?.hasFocus || doc.hasFocus());

  if (canUseAsyncClipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.focus({ preventScroll: true });
    textarea.select();
    const succeeded = document.execCommand("copy");
    textarea.remove();
    if (!succeeded) {
      throw new Error("execCommand copy rejected");
    }
  }
}

function buildPlatformUrl(prompt) {
  const template = (config.platformUrl || DEFAULT_CONFIG.platformUrl).trim();
  if (!template) {
    return "";
  }

  const encodedPrompt = encodeURIComponent(prompt);
  if (template.includes("{{prompt}}")) {
    return template.replace(/{{prompt}}/g, encodedPrompt);
  }

  const separator = template.includes("?") ? "&" : "?";
  return `${template}${separator}prompt=${encodedPrompt}`;
}

async function collectImagePayload(img) {
  const imageUrl = img.currentSrc || img.src || "";
  if (!imageUrl) {
    throw new Error("Image URL is empty.");
  }

  if (imageUrl.startsWith("data:")) {
    const parsed = parseDataUrl(imageUrl);
    return {
      imageUrl,
      mimeType: parsed.mimeType,
      base64: parsed.data
    };
  }

  try {
    const response = await fetch(imageUrl, {
      credentials: "include",
      mode: "cors"
    });

    if (!response.ok) {
      throw new Error(
        `Unable to fetch image (${response.status} ${response.statusText || ""}).`
      );
    }

    const blob = await response.blob();
    const mimeType = blob.type || "image/png";
    const buffer = await blob.arrayBuffer();
    const base64 = arrayBufferToBase64(buffer);

    return {
      imageUrl,
      mimeType,
      base64
    };
  } catch (error) {
    console.warn("[Image2Prompt] Unable to prefetch image in content script:", error);
    return {
      imageUrl,
      mimeType: "",
      base64: ""
    };
  }
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
