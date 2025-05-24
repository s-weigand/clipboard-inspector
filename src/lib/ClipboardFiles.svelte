<script lang="ts">
import { type BundledTheme } from "shiki";
import FilePreview from "./FilePreview.svelte";
import { metaData } from "./preview";
let { files, selectedTheme }: { files: FileList; selectedTheme: BundledTheme } = $props();
</script>

<div class="container">
  {#each files as file (file.name)}
    <details>
      <summary>{file.name}</summary>
      {#await metaData(file, selectedTheme) then meta}
        {@html meta}
      {/await}
      <FilePreview {file} {selectedTheme} />
    </details>
  {/each}
</div>
