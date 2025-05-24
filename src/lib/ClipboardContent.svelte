<script lang="ts">
  import { codeToHtml, type BundledTheme, type BundledLanguage } from "shiki";
  let {
    bufferType,
    bufferContent,
    selectedTheme,
    selectedLanguage,
  }: {
    bufferType: string;
    bufferContent: string;
    selectedTheme: BundledTheme;
    selectedLanguage: BundledLanguage;
  } = $props();
  const jsonLikeBufferType = [
    "application/vnd.code.copymetadata",
    "vscode-editor-data",
  ];
  function formatJsonString(jsonString: string) {
    if (jsonString) {
      return JSON.stringify(JSON.parse(jsonString), undefined, 2);
    }
    return jsonString;
  }
</script>

<div>
  {#if bufferType === "text/html"}
    {@html bufferContent}
    {#await codeToHtml( bufferContent || "", { lang: "html", theme: selectedTheme }, ) then highlighted}
      {@html highlighted}
    {/await}
  {:else if jsonLikeBufferType.includes(bufferType)}
    {#await codeToHtml( formatJsonString(bufferContent || ""), { lang: "json", theme: selectedTheme }, ) then highlighted}
      {@html highlighted}
    {/await}
  {:else}
    {#await codeToHtml( bufferContent || "", { lang: selectedLanguage, theme: selectedTheme }, ) then highlighted}
      {@html highlighted}
    {/await}
  {/if}
</div>

<style>
  div {
    all: unset;
    text-align: left;
  }
</style>
