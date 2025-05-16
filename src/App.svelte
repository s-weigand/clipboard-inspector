<script lang="ts">
  import PWABadge from "./lib/PWABadge.svelte";
  const pastCallback = (event: ClipboardEvent) => {
    event.preventDefault();
    const clipboardBuffer: DataTransfer =
      event.clipboardData || window.clipboardData;
    for (const bufferType of clipboardBuffer.types) {
      console.log({ bufferType });
      console.log({ data: clipboardBuffer.getData(bufferType) });
    }
  };
</script>

<main>
  <input
    type="text"
    on:paste={pastCallback}
    placeholder="Paste and look at your dev console"
  />
</main>

<PWABadge />
