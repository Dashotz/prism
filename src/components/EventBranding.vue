<template>
  <div class="event-branding column items-center">
    <!-- Event Logo -->
    <EventLogo :size="150" class="q-mb-md" />

    <!-- Event Title -->
    <div class="event-title-section column items-center q-mb-md">
      <h1 class="event-title-prismcode">
        <span class="event-title-prism">PRISM</span><span class="event-title-code">CODE</span>
      </h1>
      <h1 class="event-title-techsummit-year">
        <span class="event-title-tech">TECH</span>
        <span class="event-title-summit"> SUMMIT</span>
        <span class="event-title-year"> 2026</span>
      </h1>
    </div>

    <!-- Tagline -->
    <p class="event-tagline q-mb-lg">
      Empowering Innovation Through <span class="tagline-code">Code</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import EventLogo from 'components/EventLogo.vue';
</script>

<style scoped lang="sass">
.event-branding
  text-align: center

.event-title-section
  text-align: center

.event-title-prismcode
  font-size: 5rem
  font-weight: 700
  color: white
  margin: 0
  letter-spacing: 2px
  text-transform: uppercase
  font-family: $font-family
  line-height: 1.1

.event-title-prism
  font-weight: 700

.event-title-code
  font-weight: 200

.event-title-techsummit-year
  font-size: 5rem
  font-weight: 700
  margin: 0
  letter-spacing: 1px
  text-transform: uppercase
  font-family: $font-family
  line-height: 1.1

.event-title-tech
  background: linear-gradient(to right, #ADFF2F, #9EFF00, #7CFC00)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-clip: text

.event-title-summit
  background: linear-gradient(to right, #00CED1, #00BCD4, #0097A7)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-clip: text

.event-title-year
  color: white
  font-weight: 300

.event-tagline
  font-size: 2.5rem
  color: white
  font-style: italic
  margin: 0
  font-family: $font-family

.tagline-code
  font-weight: 300

@media (max-width: 768px)
  .event-title-prismcode,
  .event-title-techsummit-year
    font-size: 2.5rem

  .event-tagline
    font-size: 1rem
</style>

