<script lang="ts">
  import type { ClipboardData } from "../types/ClipboardData";
  import ClipboardContent from "./ClipboardContent.svelte";
  import ClipboardFiles from "./ClipboardFiles.svelte";
  import { userPreferences } from "./userPreferences";
  import {
    bundledThemes,
    type BundledTheme,
    type BundledLanguage,
    bundledLanguages,
  } from "shiki";
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
  let selectedLanguage = $state<BundledLanguage>("json");

  function isValidFileList(files: FileList | null): files is FileList {
    return files !== null && files.length !== 0;
  }
</script>

{#if bufferTypes.length !== 0}
  <div class="wrapper">
    <div class="preferences">
      <select
        value={selectedTheme}
        onchange={(event) => {
          userPreferences.current.syntaxTheme = event.currentTarget
            .value as BundledTheme;
        }}
      >
        {#each Object.keys(bundledThemes) as theme}
          <option>{theme}</option>
        {/each}
      </select>
      <select bind:value={selectedLanguage}>
        {#each Object.keys(bundledLanguages) as language}
          <option>{language}</option>
        {/each}
      </select>
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
              {selectedLanguage}
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
    border: 1px solid white;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    border-right: 1px solid white;
  }
  .sidebar pre.active {
    background-color: brown;
    color: aliceblue;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .content {
    padding: 1rem;
    max-width: 40rem;
    min-width: 40rem;
    word-wrap: break-word;
    overflow: auto;
  }
</style>
