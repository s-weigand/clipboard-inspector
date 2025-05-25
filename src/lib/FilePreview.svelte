<script lang="ts">
import { type BundledTheme } from "shiki";
import AwaitHtmlRender from "./AwaitHtmlRender.svelte";
import { mediaPreview, supportsMediaPreview, textPreview } from "./preview";
let { file, selectedTheme }: { file: File; selectedTheme: BundledTheme } = $props();

let renderPreview = $state(file.size < 1e5);
</script>

<div>
  {#if renderPreview === false}
    <button type="button" onclick={() => (renderPreview = true)}
      >Render preview</button
    >
  {:else if supportsMediaPreview(file) === true}
    <AwaitHtmlRender
      htmlContentPromise={mediaPreview(file)}
      waitText="Creating preview..."
    />
  {:else}
    <AwaitHtmlRender
      htmlContentPromise={textPreview(file, selectedTheme)}
      waitText="Highlighting file contents..."
    />
  {/if}
</div>

<style>
  div{
    padding: 0.5rem;
  }
</style>
