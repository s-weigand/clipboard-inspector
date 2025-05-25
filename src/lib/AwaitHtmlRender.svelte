<script lang="ts">
import Throbber from "./Throbber.svelte";
let { htmlContentPromise, waitText }: { htmlContentPromise: Promise<string>; waitText?: string } =
  $props();
</script>


{#await htmlContentPromise}
  <Throbber {waitText} />
{:then preview}
  {@html preview}
{/await}
