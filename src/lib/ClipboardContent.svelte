<script lang="ts">
import { type BundledLanguage, type BundledTheme, bundledLanguages, codeToHtml } from "shiki";
import Svelecte from "svelecte";
let {
  bufferType,
  bufferContent,
  selectedTheme,
}: {
  bufferType: string;
  bufferContent: string;
  selectedTheme: BundledTheme;
} = $props();

let selectedLanguage = $state<BundledLanguage>("json");
const jsonLikeBufferType = ["application/vnd.code.copymetadata", "vscode-editor-data"];
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
    <div class="language-select">

      <Svelecte options={Object.keys(bundledLanguages)}
                value={selectedLanguage}
                onChange={
                  (selection:{value:BundledLanguage}) => {
                    if(selection!==null){
                      selectedLanguage = selection.value
                    }
                  }
                }
      />
    </div>

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
  div.language-select{
    padding: 1rem;
    display: flex;
    flex-grow: 0;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
