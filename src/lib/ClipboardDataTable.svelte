<script lang="ts">
import { type BundledLanguage, type BundledTheme, bundledLanguages, bundledThemes } from "shiki";
import Svelecte from "svelecte";
import type { ClipboardData } from "../types/ClipboardData";
import ClipboardContent from "./ClipboardContent.svelte";
import ClipboardFiles from "./ClipboardFiles.svelte";
import { updateTheme } from "./preview";
import { userPreferences } from "./userPreferences";
let { buffers, files }: ClipboardData = $props();
let currentBufferType = $state<string>("");
let bufferTypes = $derived(Object.keys(buffers));
$effect(() => {
  if (bufferTypes.includes(currentBufferType) === false) {
    if (bufferTypes.length > 0) {
      currentBufferType = bufferTypes[0];
    } else {
      currentBufferType = "";
    }
  }
});
let selectedTheme = $derived(userPreferences.current.syntaxTheme);

$effect(() => {
  updateTheme(selectedTheme);
});

function isValidFileList(files: FileList | null): files is FileList {
  return files !== null && files.length !== 0;
}
</script>

{#if bufferTypes.length !== 0}
  <div class="wrapper">
    <div class="preferences">
      <Svelecte options={Object.keys(bundledThemes)}
                value={selectedTheme}
                onChange={
                  (selection:{value:BundledTheme}) => {
                    if(selection!==null){
                      userPreferences.current.syntaxTheme = selection.value
                    }
                  }
                }
        />
    </div>
    <div class="container">
      <div class="sidebar">
        {#each bufferTypes as bufferType (bufferType)}
          <button
            type="button"
            onclick={() => (currentBufferType = bufferType)}
          >
            <pre
              class={bufferType === currentBufferType
                ? `active ${bufferType}`
                : `${bufferType}`}>{bufferType}</pre>
          </button>
        {/each}
      </div>
      <div class="content">
        {#if currentBufferType !== ""}
          {#if currentBufferType === "Files" && isValidFileList(files)}
            <ClipboardFiles {files} {selectedTheme} />
          {:else}
            <ClipboardContent
              bufferType={currentBufferType}
              bufferContent={buffers[currentBufferType]}
              {selectedTheme}
            />
          {/if}
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  button {
    all: unset;
  }
  pre {
    margin: 0;
    line-height: 2.5;
    padding-inline: 1rem;
  }
  pre.Files {
    margin-top: 2rem;
  }
  .preferences {
    display: flex;
    flex-direction: row;
    flex-direction: row-reverse;
  }
  .container {
    all: unset;
    display: flex;
    flex-direction: row;
    text-align: left;
    border-radius: 0.5rem;
    border: 1px solid var(--font-color);
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--font-color);
  }
  .sidebar pre.active {
    background-color: rgba(165, 42, 42,0.3);
    color: var(--font-color);
    border-radius: 0.5rem 0 0 0.5rem;
    outline: 1px solid var(--font-color);
  }
  .content {
    max-width: 40rem;
    min-width: 40rem;
    word-wrap: break-word;
  }
</style>
