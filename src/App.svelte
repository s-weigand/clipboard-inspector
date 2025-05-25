<script lang="ts">
import ClipboardDataTable from "./lib/ClipboardDataTable.svelte";
import PWABadge from "./lib/PWABadge.svelte";
import type { ClipboardData } from "./types/ClipboardData";
let pastedData = $state<ClipboardData>({
  buffers: {},
  files: null,
});
let userTyped = $state(false);
const pastCallback = (event: ClipboardEvent) => {
  event.preventDefault();
  userTyped = false;
  const clipboardBuffer: DataTransfer = event.clipboardData || window.clipboardData;
  for (const bufferName of Object.keys(pastedData.buffers)) {
    delete pastedData.buffers[bufferName];
  }
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
    onkeypress={(event)=>{
      event.preventDefault()
      userTyped=true}}
  />
  {#if userTyped===true}
    <p class="user-error">You should PASTE not TYPE! 🤓</p>
  {/if}
    <ClipboardDataTable {...pastedData} />
  </main>

<PWABadge />

<style>
  input {
    width: 11.5rem;
    padding: 0.7rem;
    margin-bottom: 3rem;
    border-radius: 6px;
    border: 1px solid;
    background-color: var(--bg-color);
    color: var(--font-color);
  }
  .user-error{
    color: red;
  }
</style>
