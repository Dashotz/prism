<template>
  <q-page class="home-page">
    <div class="home-content column items-center justify-center">
      <EventBranding />

      <!-- Event Details -->
      <EventDetails
        date="January 28, 2026"
        time="1:00 to 5:00 PM"
        location="SMX Convention Center"
      />

      <!-- Registration Form -->
      <RegistrationForm />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import EventBranding from 'components/EventBranding.vue';
import EventDetails from 'components/EventDetails.vue';
import RegistrationForm from 'components/RegistrationForm.vue';
</script>

<style scoped lang="sass">
.home-page
  background-color: #000000
  min-height: calc(100vh - 70px)

.home-content
  padding: 4rem 2rem
  min-height: calc(100vh - 70px)

@media (max-width: 768px)
  .home-content
    padding: 2rem 1rem
</style>

