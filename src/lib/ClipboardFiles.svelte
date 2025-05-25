<script lang="ts">
import { type BundledTheme } from "shiki";
import AwaitHtmlRender from "./AwaitHtmlRender.svelte";
import FilePreview from "./FilePreview.svelte";
import { metaData } from "./preview";
let { files, selectedTheme }: { files: FileList; selectedTheme: BundledTheme } = $props();
</script>

<div class="container">
  {#each files as file (file.name)}
    <details>
      <summary>{file.name}</summary>
      <AwaitHtmlRender
        htmlContentPromise={metaData(file, selectedTheme)}
        waitText="Highlighting metadata..."
      />
      <FilePreview {file} {selectedTheme} />
    </details>
  {/each}
</div>

<style>
  div {
    padding: 0.5rem;
  }
</style>
