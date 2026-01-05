<template>
  <q-dialog v-model="isOpen" @hide="handleClose">
    <q-card class="qr-modal-card">
      <q-card-section class="qr-modal-header">
        <div class="qr-modal-title">Enter your registered email address:</div>
        <q-btn flat round dense icon="close" class="qr-modal-close-btn" @click="handleClose" />
      </q-card-section>

      <q-card-section v-if="!isLoading && !registrationData && !errorMessage" class="qr-modal-body">
        <q-input
          v-model="email"
          type="email"
          placeholder="Email Address"
          class="qr-email-input"
          :error="!!emailError"
          :error-message="emailError"
          @keyup.enter="handleSubmit"
          @blur="validateEmail(email)"
        />

        <q-btn class="qr-modal-submit-btn" @click="handleSubmit" :loading="isSubmitting">
          SUBMIT
        </q-btn>
      </q-card-section>

      <q-card-section v-if="isLoading" class="qr-modal-body text-center">
        <q-spinner color="white" size="2em" />
      </q-card-section>

      <q-card-section v-if="registrationData && !isLoading" class="qr-modal-body">
        <div class="registration-result">
          <p class="result-title">Your Registration ID:</p>
          <div class="registration-id-box">
            <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="QR Code" class="qr-code-image" />
          </div>
          <div class="registration-details">
            <p>Name: {{ registrationData.first_name }} {{ registrationData.last_name }}</p>
            <p>Email: {{ registrationData.email }}</p>
            <p>Company: {{ registrationData.company || 'N/A' }}</p>
          </div>
        </div>
        <q-btn class="qr-modal-submit-btn q-mt-md" @click="handleClose"> CLOSE </q-btn>
      </q-card-section>

      <q-card-section v-if="errorMessage && !isLoading" class="qr-modal-body text-center">
        <div class="error-message">
          <p>{{ errorMessage }}</p>
        </div>
        <q-btn class="qr-modal-submit-btn q-mt-md" @click="resetModal"> OK </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import QRCode from 'qrcode';
import { registrationService } from 'src/services/registrationService';

interface RegistrationData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
}

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const email = ref('');
const emailError = ref('');
const isLoading = ref(false);
const isSubmitting = ref(false);
const registrationData = ref<RegistrationData | null>(null);
const errorMessage = ref('');
const qrCodeDataUrl = ref<string>('');

watch(isOpen, (newValue) => {
  if (!newValue) {
    resetModal();
  }
});

watch(registrationData, async (newData) => {
  if (newData) {
    await generateQRCode(newData);
  } else {
    qrCodeDataUrl.value = '';
  }
});

function validateEmail(emailValue: string): boolean {
  if (!emailValue || emailValue.trim() === '') {
    emailError.value = 'This field is required';
    return false;
  }
  // Stricter email validation
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(emailValue.trim())) {
    emailError.value = 'Please enter a valid email address';
    return false;
  }
  // Check email length
  if (emailValue.trim().length > 255) {
    emailError.value = 'Email address is too long';
    return false;
  }
  emailError.value = '';
  return true;
}

async function handleSubmit() {
  if (!validateEmail(email.value)) {
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
    // Silently fail QR code generation
    qrCodeDataUrl.value = '';
  }
}

function resetModal() {
  email.value = '';
  emailError.value = '';
  isLoading.value = false;
  isSubmitting.value = false;
  registrationData.value = null;
  errorMessage.value = '';
  qrCodeDataUrl.value = '';
}

function handleClose() {
  isOpen.value = false;
}
</script>

<style scoped lang="sass">
.qr-modal-card
  background-color: #000000 !important
  border: 2px solid #ffffff !important
  border-radius: 8px !important
  max-width: 500px !important
  width: 90% !important
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 45px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.5) !important
  position: relative !important
  animation: borderPulse 2s ease-in-out infinite !important

.qr-modal-header
  display: flex !important
  justify-content: space-between !important
  align-items: flex-start !important
  padding: 1.5rem 1.5rem 1rem 1.5rem !important
  position: relative !important

.qr-modal-title
  color: #ffffff !important
  font-size: 1.1rem !important
  font-weight: 400 !important
  text-align: left !important
  margin: 0 !important
  padding: 0 !important
  line-height: 1.4 !important
  flex: 1 !important

.qr-modal-close-btn
  background: transparent !important
  border: 2px solid #ffffff !important
  border-radius: 50% !important
  color: #ffffff !important
  width: 32px !important
  height: 32px !important
  min-width: 32px !important
  padding: 0 !important
  margin-left: 1rem !important
  transition: all 0.3s ease !important
  &:hover
    background: rgba(255, 255, 255, 0.1) !important
    transform: scale(1.05) !important
  &:focus
    box-shadow: none !important
    outline: none !important
  :deep(.q-icon)
    font-size: 18px !important

.qr-modal-body
  padding: 0 1.5rem 1.5rem 1.5rem !important

.qr-email-input
  width: 100% !important
  margin-bottom: 0.75rem !important
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
      line-height: 1.5 !important
  :deep(.q-field__label)
    color: rgba(255, 255, 255, 0.7) !important
  :deep(.q-field__messages)
    color: #ffffff !important
    margin-top: 0.5rem !important
    font-size: 0.9rem !important
    padding: 0 !important
  :deep(.q-field--error .q-field__control)
    border-color: #ff6b6b !important

.privacy-text
  color: #B0B0B0 !important
  font-size: 0.85rem !important
  text-align: center !important
  margin: 0.75rem 0 1rem 0 !important
  line-height: 1.4 !important

.qr-modal-submit-btn
  background: linear-gradient(to right, #556B2F, #2F4F4F) !important
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
  position: relative !important
  background-image: linear-gradient(#000000, #000000), linear-gradient(to right, #ADFF2F, #9EFF00, #00CED1) !important
  background-origin: border-box !important
  background-clip: padding-box, border-box !important
  margin-top: 0 !important
  &:hover
    background-image: linear-gradient(to right, #6B8E23, #3D5A5A), linear-gradient(to right, #ADFF2F, #9EFF00, #00CED1) !important
    transform: translateY(-1px) !important
  &:active
    transform: translateY(0) !important
  &:focus
    outline: none !important

.registration-result
  text-align: center !important
  padding: 1rem 0 !important

.result-title
  color: #e0e0e0 !important
  margin-bottom: 1rem !important
  font-size: 1rem !important

.registration-id-box
  background: white !important
  padding: 1.5rem !important
  border-radius: 8px !important
  display: inline-block !important
  margin-bottom: 1rem !important
  display: flex !important
  align-items: center !important
  justify-content: center !important

.qr-code-image
  width: 200px !important
  height: 200px !important
  display: block !important
  margin: 0 auto !important

.registration-details
  color: #888 !important
  font-size: 0.9rem !important
  margin-top: 1rem !important
  p
    margin: 0.25rem 0 !important

.error-message
  color: #ffffff !important
  font-size: 1rem !important
  margin-bottom: 1rem !important
  p
    margin: 0 !important
    line-height: 1.5 !important

@keyframes borderPulse
  0%, 100%
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 45px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.5) !important
    border-color: #ffffff !important
  50%
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.3), 0 0 75px rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.5) !important
    border-color: #ffffff !important
</style>
