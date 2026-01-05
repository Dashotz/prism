<template>
  <q-page class="speakers-page">
    <div class="page-content">
      <h1 class="page-title">Speakers</h1>
      <div class="speakers-grid">
        <div class="speaker-card" v-for="i in 6" :key="i">
          <div class="speaker-placeholder">
            <q-icon name="person" size="60px" color="grey-6" />
          </div>
          <h3 class="speaker-name">Speaker {{ i }}</h3>
          <p class="speaker-title">Tech Expert</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
</script>

<style scoped lang="sass">
.speakers-page
  background-color: #000000
  min-height: calc(100vh - 70px)

.page-content
  padding: 4rem 2rem
  max-width: 1200px
  margin: 0 auto

.page-title
  font-size: 3rem
  color: white
  margin-bottom: 3rem
  text-align: center
  font-weight: 700

.speakers-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: 2rem

.speaker-card
  background-color: #1a1a1a
  border-radius: 8px
  padding: 2rem
  text-align: center
  border: 1px solid #333

.speaker-placeholder
  width: 120px
  height: 120px
  border-radius: 50%
  background-color: #2a2a2a
  display: flex
  align-items: center
  justify-content: center
  margin: 0 auto 1rem

.speaker-name
  color: white
  font-size: 1.3rem
  margin: 0.5rem 0
  font-weight: 600

.speaker-title
  color: #9EFF00
  font-size: 1rem
  margin: 0
</style>

