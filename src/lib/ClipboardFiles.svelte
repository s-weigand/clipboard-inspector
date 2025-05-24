<script lang="ts">
  import { type BundledTheme } from "shiki";
  import { metaData } from "./preview";
  import FilePreview from "./FilePreview.svelte";
  let {
    files,
    selectedTheme,
  }: { files: FileList; selectedTheme: BundledTheme } = $props();
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
