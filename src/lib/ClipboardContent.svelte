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
let htmlView = $state<"source" | "render">("source");
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
    <div class="top-bar">
      <button type="button" onclick={()=>{htmlView="source"}}>
        <pre class={htmlView==="source"?"active":""} >Source</pre>
      </button>
      <button type="button" onclick={()=>{htmlView="render"}}>
        <pre class={htmlView==="render"?"active":""}>Render</pre>
      </button>
    </div>
    {#if htmlView==="source"}
      {#await codeToHtml( bufferContent || "", { lang: "html", theme: selectedTheme }, ) then highlighted}
        {@html highlighted}
      {/await}
    {:else}
      <pre class="shiki">
        {@html bufferContent}
      </pre>
    {/if}
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
  .top-bar {
    padding-top: 0.2rem;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid var(--font-color);
    margin-bottom: 0.5rem;
  }
  .top-bar  button{
    all: unset;
  }
  .top-bar pre {
    color: var(--font-color);
    margin: 0;
    line-height: 2.5;
    padding-inline: 1rem;
  }
  .top-bar pre.active {
    background-color: rgba(165, 42, 42,0.3);
    color: var(--font-color);
    border-radius: 0.5rem 0.5rem 0 0;
    margin: 0;
    line-height: 2.5;
    outline: 1px solid var(--font-color);
  }
  div.language-select{
    padding: 1rem;
    display: flex;
    flex-grow: 0;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
