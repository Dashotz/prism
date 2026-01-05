<template>
  <div class="registration-form">
    <PrivacyPolicySection v-model="privacyAccepted" class="q-mb-lg" />

    <q-btn
      :disable="!privacyAccepted"
      unelevated
      rounded
      class="register-btn q-px-xl q-py-md"
      @click="handleRegister"
    >
      Click Here to Register
    </q-btn>

    <div class="already-registered q-mt-md">
      <span class="text-white">Already Registered? </span>
      <a href="#" class="qr-link" @click.prevent="showQRModal = true"> View your QR ID here. </a>
    </div>

    <ViewQRModal v-model="showQRModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PrivacyPolicySection from 'components/PrivacyPolicySection.vue';
import ViewQRModal from 'components/ViewQRModal.vue';

const router = useRouter();
const privacyAccepted = ref(false);
const showQRModal = ref(false);

function handleRegister() {
  if (privacyAccepted.value) {
    void router.push('/register');
  }
}
</script>

<style scoped lang="sass">
.registration-form
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 3rem


.register-btn
  background-color: transparent
  border: 2px solid #9EFF00
  color: white
  font-size: 16px
  font-weight: 500
  letter-spacing: 1px
  min-width: 250px
  &:not(:disabled):hover
    background-color: rgba(158, 255, 0, 0.1)
  &:disabled
    opacity: 0.5
    cursor: not-allowed

.already-registered
  text-align: center

.qr-link
  color: #B0B0B0
  text-decoration: underline
  cursor: pointer
  &:hover
    color: white
</style>
