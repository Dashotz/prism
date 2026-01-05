<template>
  <q-page class="contact-page">
    <div class="page-content">
      <h1 class="page-title">Contact Us</h1>
      <div class="contact-section">
        <div class="contact-info">
          <div class="contact-item">
            <q-icon name="email" size="32px" color="white" />
            <div>
              <h3 class="contact-label">Email</h3>
              <p class="contact-value">info@prismcode.com</p>
            </div>
          </div>
          <div class="contact-item">
            <q-icon name="phone" size="32px" color="white" />
            <div>
              <h3 class="contact-label">Phone</h3>
              <p class="contact-value">+1 (555) 123-4567</p>
            </div>
          </div>
          <div class="contact-item">
            <q-icon name="place" size="32px" color="white" />
            <div>
              <h3 class="contact-label">Address</h3>
              <p class="contact-value">SMX Convention Center<br />Manila, Philippines</p>
            </div>
          </div>
        </div>
        <q-card class="contact-form-card">
          <q-card-section>
            <h2 class="form-title">Send us a Message</h2>
            <q-form @submit="onSubmit" class="contact-form">
              <q-input
                v-model="form.name"
                label="Name"
                outlined
                dark
                class="q-mb-md"
                :rules="[(val) => !!val || 'Name is required']"
              />
              <q-input
                v-model="form.email"
                label="Email"
                type="email"
                outlined
                dark
                class="q-mb-md"
                :rules="[(val) => !!val || 'Email is required']"
              />
              <q-input
                v-model="form.message"
                label="Message"
                type="textarea"
                outlined
                dark
                rows="5"
                class="q-mb-md"
                :rules="[(val) => !!val || 'Message is required']"
              />
              <q-btn
                type="submit"
                unelevated
                rounded
                class="submit-btn q-px-xl"
                :disable="!form.name || !form.email || !form.message"
              >
                Send Message
              </q-btn>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const form = ref({
  name: '',
  email: '',
  message: '',
});

function onSubmit() {
  // TODO: Implement form submission
  $q.notify({
    message: 'Thank you for your message! We will get back to you soon.',
    color: 'positive',
    position: 'top',
  });
  form.value = {
    name: '',
    email: '',
    message: '',
  };
}
</script>

<style scoped lang="sass">
.contact-page
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

.contact-section
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 3rem

.contact-info
  display: flex
  flex-direction: column
  gap: 2rem

.contact-item
  display: flex
  gap: 1.5rem
  align-items: flex-start

.contact-label
  color: #9EFF00
  font-size: 1.2rem
  margin: 0 0 0.5rem 0
  font-weight: 600

.contact-value
  color: white
  font-size: 1rem
  margin: 0
  line-height: 1.6

.contact-form-card
  background-color: #1a1a1a
  border: 1px solid #333

.form-title
  color: white
  font-size: 1.5rem
  margin-bottom: 1.5rem
  font-weight: 600

.submit-btn
  background-color: transparent
  border: 2px solid #9EFF00
  color: white
  width: 100%
  &:not(:disabled):hover
    background-color: rgba(158, 255, 0, 0.1)

@media (max-width: 768px)
  .contact-section
    grid-template-columns: 1fr
</style>

