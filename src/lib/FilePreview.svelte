<script lang="ts">
import { type BundledTheme } from "shiki";
import { mediaPreview, supportsMediaPreview, textPreview } from "./preview";
let { file, selectedTheme }: { file: File; selectedTheme: BundledTheme } = $props();

let renderPreview = $state(file.size < 1e6);
</script>

<div>
  {#if renderPreview === false}
    <button type="button" onclick={() => (renderPreview = true)}
      >Render preview</button
    >
  {:else if supportsMediaPreview(file) === true}
    {#await mediaPreview(file)}
      Creating preview...
    {:then preview}
      {@html preview}
    {/await}
  {:else}
    {#await textPreview(file, selectedTheme) then preview}
      {@html preview}
    {/await}
  {/if}
</div>
