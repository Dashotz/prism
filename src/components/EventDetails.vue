<template>
  <div class="event-details row items-center justify-center q-gutter-md">
    <div class="row items-center q-gutter-sm">
      <q-icon name="event" size="24px" color="white" />
      <span class="text-white">{{ date }}</span>
    </div>
    <div class="separator"></div>
    <div class="row items-center q-gutter-sm">
      <q-icon name="schedule" size="24px" color="white" />
      <span class="text-white">{{ time }}</span>
    </div>
    <div class="separator"></div>
    <div class="row items-center q-gutter-sm">
      <q-icon name="place" size="24px" color="white" />
      <span class="text-white">{{ location }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  date: string;
  time: string;
  location: string;
}>();
</script>

<style scoped lang="sass">
.event-details
  margin: 2rem 0

.separator
  width: 2px
  height: 30px
  background-color: white
  opacity: 0.5
</style>

