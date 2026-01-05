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
      <a href="#" class="qr-link" @click.prevent="showQRDialog = true"> View your QR ID here. </a>
    </div>

    <q-dialog v-model="showQRDialog" persistent>
      <q-card class="qr-dialog-card" style="min-width: 500px">
        <q-card-section class="qr-dialog-header">
          <div class="qr-dialog-title">Enter your registered email address:</div>
          <q-btn flat round dense icon="close" class="qr-close-btn" @click="showQRDialog = false" />
        </q-card-section>

        <q-card-section
          v-if="!isLoading && !registrationData && !errorMessage"
          class="qr-dialog-body"
        >
          <q-input
            v-model="email"
            type="email"
            placeholder="Email Address"
            class="qr-email-input"
            :error="!!emailError"
            :error-message="emailError"
            @keyup.enter="handleSubmit"
            @blur="validateEmailInput"
            autofocus
          />

          <q-btn class="qr-submit-btn" @click="handleSubmit" :loading="isSubmitting">
            SUBMIT
          </q-btn>
        </q-card-section>

        <q-card-section v-if="isLoading" class="qr-dialog-body text-center">
          <q-spinner color="white" size="3em" />
        </q-card-section>

        <q-card-section v-if="registrationData && !isLoading" class="qr-dialog-body">
          <div class="text-center">
            <p class="text-h6 q-mb-md">Your Registration ID:</p>
            <div class="q-mb-md">
              <img
                v-if="qrCodeDataUrl"
                :src="qrCodeDataUrl"
                alt="QR Code"
                style="width: 200px; height: 200px"
              />
            </div>
            <div class="text-body2">
              <p>Name: {{ registrationData.first_name }} {{ registrationData.last_name }}</p>
              <p>Email: {{ registrationData.email }}</p>
              <p>Company: {{ registrationData.company || 'N/A' }}</p>
            </div>
          </div>
          <q-btn class="qr-submit-btn q-mt-md" @click="showQRDialog = false"> CLOSE </q-btn>
        </q-card-section>

        <q-card-section v-if="errorMessage && !isLoading" class="qr-dialog-body text-center">
          <p class="qr-error-message">{{ errorMessage }}</p>
          <q-btn class="qr-submit-btn q-mt-md" @click="resetDialog"> OK </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import QRCode from 'qrcode';
import PrivacyPolicySection from 'components/PrivacyPolicySection.vue';
import { registrationService } from 'src/services/registrationService';
import { validateEmail } from 'src/utils/validation';

interface RegistrationData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
}

const router = useRouter();
const privacyAccepted = ref(false);
const showQRDialog = ref(false);
const email = ref('');
const emailError = ref('');
const isLoading = ref(false);
const isSubmitting = ref(false);
const registrationData = ref<RegistrationData | null>(null);
const errorMessage = ref('');
const qrCodeDataUrl = ref<string>('');

watch(showQRDialog, (newValue) => {
  if (!newValue) {
    resetDialog();
  }
});

watch(registrationData, async (newData) => {
  if (newData) {
    await generateQRCode(newData);
  } else {
    qrCodeDataUrl.value = '';
  }
});

function handleRegister() {
  if (privacyAccepted.value) {
    void router.push('/register');
  }
}

function validateEmailInput() {
  const error = validateEmail(email.value);
  emailError.value = error || '';
}

async function handleSubmit() {
  const validationError = validateEmail(email.value);
  if (validationError) {
    emailError.value = validationError;
    return;
  }

  isSubmitting.value = true;
  isLoading.value = true;
  errorMessage.value = '';
  registrationData.value = null;

  try {
    const result = await registrationService.getRegistrationByEmail(email.value);

    if (result.success && result.data) {
      registrationData.value = result.data;
    } else {
      errorMessage.value = 'Email not found. Please register first.';
    }
  } catch {
    errorMessage.value = 'An error occurred. Please try again.';
  } finally {
    isLoading.value = false;
    isSubmitting.value = false;
  }
}

async function generateQRCode(data: RegistrationData) {
  try {
    const qrData = JSON.stringify({
      id: data.id.toString().padStart(6, '0'),
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      company: data.company || 'N/A',
    });

    qrCodeDataUrl.value = await QRCode.toDataURL(qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
  } catch {
    qrCodeDataUrl.value = '';
  }
}

function resetDialog() {
  email.value = '';
  emailError.value = '';
  isLoading.value = false;
  isSubmitting.value = false;
  registrationData.value = null;
  errorMessage.value = '';
  qrCodeDataUrl.value = '';
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

.qr-dialog-card
  background-color: #000000 !important
  border: 2px solid #ffffff !important
  border-radius: 8px !important
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.5) !important

.qr-dialog-header
  display: flex !important
  justify-content: space-between !important
  align-items: flex-start !important
  padding: 1.5rem 1.5rem 1rem 1.5rem !important

.qr-dialog-title
  color: #ffffff !important
  font-size: 1.1rem !important
  font-weight: 400 !important
  flex: 1 !important

.qr-close-btn
  background: transparent !important
  border: 2px solid transparent !important
  border-radius: 50% !important
  color: #ffffff !important
  width: 32px !important
  height: 32px !important
  min-width: 32px !important
  padding: 0 !important
  margin-left: 1rem !important
  background-image: linear-gradient(#000000, #000000), linear-gradient(to right, #ADFF2F, #9EFF00, #00CED1) !important
  background-origin: border-box !important
  background-clip: padding-box, border-box !important
  transition: all 0.3s ease !important
  &:hover
    background: rgba(255, 255, 255, 0.1) !important
    transform: scale(1.05) !important

.qr-dialog-body
  padding: 0 1.5rem 1.5rem 1.5rem !important

.qr-email-input
  width: 100% !important
  margin-bottom: 1rem !important
  :deep(.q-field__control)
    background-color: #008B8B !important
    border: 1px solid #ffffff !important
    border-radius: 6px !important
    padding: 0.75rem 1rem !important
    min-height: auto !important
    height: auto !important
  :deep(.q-field__native)
    color: #ffffff !important
    font-size: 1rem !important
    line-height: 1.5 !important
    padding: 0 !important
    display: flex !important
    align-items: center !important
    &::placeholder
      color: rgba(255, 255, 255, 0.7) !important
      opacity: 1 !important
  :deep(.q-field__messages)
    color: #ffffff !important
    margin-top: 0.5rem !important
    font-size: 0.9rem !important
  :deep(.q-field--error .q-field__control)
    border-color: #ff6b6b !important

.qr-submit-btn
  background: #000000 !important
  border: 2px solid transparent !important
  border-radius: 50px !important
  color: #ffffff !important
  font-weight: 500 !important
  font-size: 0.95rem !important
  letter-spacing: 1px !important
  text-transform: uppercase !important
  padding: 0.65rem 2rem !important
  min-width: 160px !important
  width: 100% !important
  transition: all 0.3s ease !important
  background-image: linear-gradient(#000000, #000000), linear-gradient(to right, #ADFF2F, #9EFF00, #00CED1) !important
  background-origin: border-box !important
  background-clip: padding-box, border-box !important
  &:hover
    background-image: linear-gradient(to right, #2a2a2a, #1a1a1a), linear-gradient(to right, #ADFF2F, #9EFF00, #00CED1) !important
    transform: translateY(-1px) !important
  &:active
    transform: translateY(0) !important

.qr-error-message
  color: #ffffff !important
  font-size: 1rem !important
  margin-bottom: 1rem !important
</style>
