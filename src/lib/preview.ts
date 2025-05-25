import { type BundledLanguage, type BundledTheme, bundledLanguages, codeToHtml } from "shiki";

export function findLanguage(file: File): BundledLanguage {
  const fineNameElements = file.name.split(".");
  const extension = fineNameElements[fineNameElements.length - 1];
  if (Object.keys(bundledLanguages).includes(extension)) {
    console.log("Found Langue:", extension, "for file", file.name);
    return extension as BundledLanguage;
  }
  if (["mjs"].includes(extension)) {
    return "js";
  }
  console.log("Falling back to json for file:", file.name, "with extension", extension);
  return "json";
}
function fileMetaInformation(file: File & { lastModifiedDate?: Date }): string {
  const extractedData = {
    lastModified: file.lastModified,
    lastModifiedDate: file?.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
  };
  return JSON.stringify(extractedData, undefined, 2);
}

async function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

export async function metaData(file: File, theme: BundledTheme): Promise<string> {
  return await codeToHtml(fileMetaInformation(file), {
    lang: "json",
    theme: theme,
  });
}

export function supportsMediaPreview(file: File): boolean {
  return file.type.startsWith("image/") || file.type.startsWith("video/");
}

export async function mediaPreview(file: File): Promise<string> {
  if (file.type.startsWith("image/")) {
    const base64 = await toBase64(file);
    return `<img style="max-width: 100%;" src="${base64}" alt="Rendered ${file.name}" >`;
  }
  if (file.type.startsWith("video/")) {
    if (file.type === "video/mp4") {
      const base64 = await toBase64(file);
      return `<video style="max-width: 100%;" controls alt="Rendered ${file.name}" ><source src="${base64}"></video>`;
    }
    return "<p>Rendering is only videos of type <code>video/mp4</code> are supported.</p>";
  }
  return `Media type ${file.type} is not supported.`;
}

export async function textPreview(file: File, theme: BundledTheme): Promise<string> {
  const text = await file.text();
  return await codeToHtml(text, { lang: findLanguage(file), theme: theme });
}

export async function updateTheme(theme: BundledTheme): Promise<void> {
  const renderedPre = await codeToHtml("", { lang: "json", theme: theme });
  const tmpElement = document.createElement("div");
  tmpElement.innerHTML = renderedPre;
  const style = (tmpElement.firstChild as HTMLElement).style;
  document.documentElement.style.setProperty("--bg-color", style.backgroundColor);
  document.documentElement.style.setProperty("--font-color", style.color);
}
