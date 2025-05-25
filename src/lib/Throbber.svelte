<script lang="ts">
let { waitText = "Rendering..." }: { waitText?: string } = $props();
</script>


<div>
  <span class="loader"></span><span class="text">{waitText}</span>
</div>

<style>
  div{
    display: flex;
    justify-items: center;
    gap: 1rem;
  }
  span.text{
    margin-top: 0.2rem;
  }
</style>
