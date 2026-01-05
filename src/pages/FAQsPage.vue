<template>
  <q-page class="faqs-page">
    <div class="page-content">
      <h1 class="page-title">Frequently Asked Questions</h1>
      <div class="faqs-list">
        <q-expansion-item
          v-for="(faq, index) in faqs"
          :key="index"
          :label="faq.question"
          class="faq-item"
          header-class="faq-header"
          expand-icon-class="faq-icon"
        >
          <q-card>
            <q-card-section class="faq-answer">
              {{ faq.answer }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const faqs = ref([
  {
    question: 'What is PRISMCODE TECH SUMMIT 2026?',
    answer:
      'PRISMCODE TECH SUMMIT 2026 is a premier technology conference bringing together developers, innovators, and tech enthusiasts to share knowledge and inspire innovation.',
  },
  {
    question: 'When and where is the event?',
    answer:
      'The event will be held on January 28, 2026, from 1:00 to 5:00 PM at the SMX Convention Center.',
  },
  {
    question: 'How do I register?',
    answer:
      'You can register by clicking the "Click Here to Register" button on the home page. Make sure to read and accept the Privacy Policy before proceeding.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'Registration details and fees will be announced soon. Please check back for updates.',
  },
  {
    question: 'What should I bring to the event?',
    answer:
      'Please bring a valid ID, your registration confirmation (QR code), and any materials you may need for note-taking.',
  },
  {
    question: 'Will there be food and beverages?',
    answer:
      'Refreshments will be provided during the event. More details will be shared closer to the event date.',
  },
]);
</script>

<style scoped lang="sass">
.faqs-page
  background-color: #000000
  min-height: calc(100vh - 70px)

.page-content
  padding: 4rem 2rem
  max-width: 900px
  margin: 0 auto

.page-title
  font-size: 3rem
  color: white
  margin-bottom: 3rem
  text-align: center
  font-weight: 700

.faqs-list
  display: flex
  flex-direction: column
  gap: 1rem

.faq-item
  background-color: #1a1a1a
  border: 1px solid #333
  border-radius: 8px

.faq-header
  color: white
  font-size: 1.1rem
  font-weight: 500

.faq-icon
  color: #9EFF00

.faq-answer
  color: #cccccc
  background-color: #0f0f0f
  line-height: 1.6
</style>

