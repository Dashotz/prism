<template>
  <div class="event-logo-container">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="prism-logo"
    >
      <polygon
        points="50,10 90,30 90,70 50,90 10,70 10,30"
        fill="url(#prismGradientLogo)"
        stroke="white"
        stroke-width="2"
      />
      <defs>
        <linearGradient id="prismGradientLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
          <stop offset="25%" style="stop-color:#00FF00;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#00BFFF;stop-opacity:1" />
          <stop offset="75%" style="stop-color:#9370DB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF4500;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
  }>(),
  {
    size: 120,
  }
);
</script>

<style scoped lang="sass">
.event-logo-container
  display: flex
  justify-content: center
  align-items: center
  margin-bottom: 2rem

.prism-logo
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))
</style>

