<script lang="ts">
  import PWABadge from "./lib/PWABadge.svelte";
  import ClipboardDataTable from "./lib/ClipboardDataTable.svelte";
  import type { ClipboardData } from "./types/ClipboardData";
  let pastedData = $state<ClipboardData>({
    buffers: {},
    files: null,
  });
  const pastCallback = (event: ClipboardEvent) => {
    event.preventDefault();
    const clipboardBuffer: DataTransfer =
      event.clipboardData || window.clipboardData;
    Object.keys(pastedData.buffers).forEach((key) => {
      delete pastedData.buffers[key];
    });
    pastedData.files = null;
    for (const bufferType of clipboardBuffer.types) {
      pastedData.buffers[bufferType] = clipboardBuffer.getData(bufferType);
      console.log({ bufferType });
      console.log({ data: clipboardBuffer.getData(bufferType) });
    }
    console.log({ files: clipboardBuffer.files });
    pastedData.files = clipboardBuffer.files;
  };
</script>

<main>
  <input
    type="text"
    onpaste={pastCallback}
    placeholder="Paste to inspect your clipboard"
  />
  <ClipboardDataTable {...pastedData} />
</main>

<PWABadge />

<style>
  input {
    width: 11.5rem;
    padding: 0.3rem;
    margin-bottom: 3rem;
    border-radius: 6px;
    border: 1px solid;
  }
</style>
