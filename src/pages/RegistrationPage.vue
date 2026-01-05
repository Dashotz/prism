<template>
  <q-page class="registration-page">
    <div class="registration-content column items-center justify-center">
      <EventBranding />

      <div class="registration-container">
        <h2 class="form-title q-mb-lg">Fill out the form completely:</h2>

        <div class="form-fields">
          <div class="row q-gutter-md q-mb-md">
            <q-input
              v-model="formData.firstName"
              label="First Name"
              outlined
              dark
              class="form-input"
              :rules="[validateName]"
              @update:model-value="(val) => handleNameInput('firstName', val)"
            />
            <q-input
              v-model="formData.lastName"
              label="Last Name"
              outlined
              dark
              class="form-input"
              :rules="[validateName]"
              @update:model-value="(val) => handleNameInput('lastName', val)"
            />
            <q-input
              v-model="formData.mobileNumber"
              label="Mobile Number"
              outlined
              dark
              class="form-input"
              :rules="[validateMobileNumber]"
              @update:model-value="handleMobileInput"
              maxlength="11"
            />
          </div>

          <div class="row q-gutter-md q-mb-lg">
            <q-input
              v-model="formData.email"
              label="Email"
              type="email"
              outlined
              dark
              class="form-input"
              :rules="[validateEmailForQuasar]"
              @update:model-value="(val) => (formData.email = sanitizeEmail(String(val || '')))"
            />
            <q-input
              v-model="formData.company"
              label="Company"
              outlined
              dark
              class="form-input"
              :rules="[(val) => validateText(val, 'Company', 200)]"
              @update:model-value="
                (val) => (formData.company = sanitizeText(String(val || ''), 200))
              "
            />
            <q-input
              v-model="formData.position"
              label="Position"
              outlined
              dark
              class="form-input"
              :rules="[(val) => validateText(val, 'Position', 200)]"
              @update:model-value="
                (val) => (formData.position = sanitizeText(String(val || ''), 200))
              "
            />
          </div>
        </div>

        <div class="form-buttons row q-gutter-md justify-center">
          <q-btn flat class="back-btn" @click="goBack"> BACK </q-btn>
          <q-btn unelevated class="submit-btn" :disable="!isFormValid" @click="handleSubmit">
            SUBMIT
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar, Dialog } from 'quasar';
import EventBranding from 'components/EventBranding.vue';
import { registrationService } from 'src/services/registrationService';
import {
  validateName,
  validateMobileNumber,
  validateText,
  validateEmailForQuasar,
  sanitizeText,
  sanitizeName,
  sanitizeMobile,
  sanitizeEmail,
} from 'src/utils/validation';

const router = useRouter();
const $q = useQuasar();

const formData = ref({
  firstName: '',
  lastName: '',
  mobileNumber: '',
  email: '',
  company: '',
  position: '',
});

// Sanitization handlers
const handleNameInput = (field: 'firstName' | 'lastName', value: string | number | null) => {
  formData.value[field] = value === null || value === undefined ? '' : sanitizeName(String(value));
};

const handleMobileInput = (value: string | number | null) => {
  formData.value.mobileNumber =
    value === null || value === undefined ? '' : sanitizeMobile(String(value));
};

const isFormValid = computed(() => {
  return (
    validateName(formData.value.firstName) === true &&
    validateName(formData.value.lastName) === true &&
    validateMobileNumber(formData.value.mobileNumber) === true &&
    validateEmailForQuasar(formData.value.email) === true &&
    validateText(formData.value.company, 'Company', 200) === true &&
    validateText(formData.value.position, 'Position', 200) === true
  );
});

function goBack() {
  void router.push('/');
}

function showDialog(title: string, message: string, color: 'positive' | 'negative' = 'negative') {
  Dialog.create({
    title,
    message,
    class: 'qr-dialog-custom',
    ok: {
      label: 'OK',
      color,
    },
  });
}

async function handleSubmit() {
  if (!isFormValid.value) {
    return;
  }

  try {
    if ($q && $q.loading) {
      $q.loading.show({
        message: 'Submitting registration...',
      });
    }

    const result = await registrationService.createRegistration({
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      mobileNumber: formData.value.mobileNumber,
      email: formData.value.email,
      company: formData.value.company,
      position: formData.value.position,
    });

    if (result.success && result.data) {
      Dialog.create({
        title: 'Registration Successful',
        message: 'Your registration has been submitted successfully!',
        class: 'qr-dialog-custom',
        ok: {
          label: 'OK',
          color: 'positive',
        },
      }).onOk(() => {
        void router.push('/');
      });
    } else {
      showDialog('Registration Failed', result.error || 'Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showDialog(
      'Error',
      error instanceof Error ? error.message : 'An error occurred. Please try again later.',
    );
  } finally {
    if ($q && $q.loading) {
      $q.loading.hide();
    }
  }
}
</script>

<style scoped lang="sass">
.registration-page
  background-color: #000000
  min-height: calc(100vh - 50px)

.registration-content
  padding: 4rem 2rem
  min-height: calc(100vh - 50px)

.registration-container
  max-width: 900px
  width: 100%

.form-title
  color: white
  font-family: $font-family
  font-size: 1.5rem
  font-weight: 500
  text-align: center

.form-fields
  width: 100%

.form-input
  flex: 1
  :deep(.q-field__label)
    color: white
  :deep(.q-field__control)
    color: white
  :deep(.q-field__native)
    color: white
  :deep(.q-field__outline)
    border-color: #00CED1

.form-buttons
  margin-top: 2rem

.back-btn
  border: 1px solid #FF6B35
  color: white
  background-color: #000000
  min-width: 120px
  font-weight: 500
  letter-spacing: 1px
  &:hover
    background-color: rgba(255, 107, 53, 0.1)
    color: #FF6B35

.submit-btn
  background: linear-gradient(to right, #FF6B35, #FF1744)
  color: white
  min-width: 120px
  font-weight: 500
  letter-spacing: 1px
  &:not(:disabled):hover
    opacity: 0.9
  &:disabled
    opacity: 0.5
    cursor: not-allowed
</style>
