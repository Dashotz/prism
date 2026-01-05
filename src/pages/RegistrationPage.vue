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
            />
            <q-input
              v-model="formData.company"
              label="Company"
              outlined
              dark
              class="form-input"
            />
            <q-input
              v-model="formData.position"
              label="Position"
              outlined
              dark
              class="form-input"
            />
          </div>
        </div>

        <div class="form-buttons row q-gutter-md justify-center">
          <q-btn
            flat
            class="back-btn"
            @click="goBack"
          >
            BACK
          </q-btn>
          <q-btn
            unelevated
            class="submit-btn"
            :disable="!isFormValid"
            @click="handleSubmit"
          >
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
import { useQuasar } from 'quasar';
import Swal from 'sweetalert2';
import EventBranding from 'components/EventBranding.vue';
import { registrationService } from 'src/services/registrationService';

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

// Validation rules
const validateName = (val: string): boolean | string => {
  if (!val) return 'This field is required';
  const nameRegex = /^[A-Za-z\sñÑ-]+$/;
  if (!nameRegex.test(val)) {
    return 'Only letters, spaces, ñ, Ñ, and hyphens are allowed';
  }
  return true;
};

const validateMobileNumber = (val: string): boolean | string => {
  if (!val) return 'This field is required';
  const numberRegex = /^\d+$/;
  if (!numberRegex.test(val)) {
    return 'Only numbers are allowed';
  }
  if (val.length < 10 || val.length > 11) {
    return 'Mobile number must be 10 or 11 digits';
  }
  return true;
};

// Sanitization functions
const handleNameInput = (field: 'firstName' | 'lastName', value: string | number | null) => {
  if (value === null || value === undefined) {
    formData.value[field] = '';
    return;
  }
  // Remove all characters except letters, spaces, ñ, Ñ, and hyphens
  const sanitized = String(value).replace(/[^A-Za-z\sñÑ-]/g, '');
  formData.value[field] = sanitized;
};

const handleMobileInput = (value: string | number | null) => {
  if (value === null || value === undefined) {
    formData.value.mobileNumber = '';
    return;
  }
  // Remove all non-numeric characters
  let sanitized = String(value).replace(/\D/g, '');
  // Limit to 11 digits (max for Philippines)
  if (sanitized.length > 11) {
    sanitized = sanitized.slice(0, 11);
  }
  formData.value.mobileNumber = sanitized;
};

const isFormValid = computed(() => {
  const firstNameValid = formData.value.firstName && validateName(formData.value.firstName) === true;
  const lastNameValid = formData.value.lastName && validateName(formData.value.lastName) === true;
  const mobileValid = formData.value.mobileNumber && validateMobileNumber(formData.value.mobileNumber) === true;
  
  return (
    firstNameValid &&
    lastNameValid &&
    mobileValid &&
    formData.value.email &&
    formData.value.company &&
    formData.value.position
  );
});

function goBack() {
  void router.push('/');
}

async function handleSubmit() {
  if (!isFormValid.value) {
    return;
  }

  const loadingShown = $q && $q.loading;
  try {
    if (loadingShown) {
      $q.loading.show({
        message: 'Submitting registration...',
      });
    }

    console.log('Submitting registration:', formData.value);
    const result = await registrationService.createRegistration({
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      mobileNumber: formData.value.mobileNumber,
      email: formData.value.email,
      company: formData.value.company,
      position: formData.value.position,
    });

    console.log('Registration result:', result);
    console.log('Success:', result.success);
    console.log('Data:', result.data);
    console.log('Error:', result.error);

    if (result.success && result.data) {
      // Show success dialog with SweetAlert2
      await Swal.fire({
        title: 'Registration Successful!',
        html: '<div style="text-align: center;"><p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #e0e0e0;">Your registration has been submitted successfully!</p><p style="color: #888; font-size: 0.9rem;">You will be redirected to the homepage.</p></div>',
        icon: 'success',
        confirmButtonText: 'Continue to Homepage',
        confirmButtonColor: '#4caf50',
        background: '#1a1a1a',
        color: '#ffffff',
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
          popup: 'sweet-alert-dark',
          title: 'sweet-alert-title',
          confirmButton: 'sweet-alert-button',
        },
      });
      // Redirect to homepage after user clicks OK
      void router.push('/');
    } else {
      const errorMsg = result.error || 'Registration failed. Please try again.';
      console.error('Registration failed:', errorMsg);
      await Swal.fire({
        title: 'Registration Failed',
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f44336',
        background: '#1a1a1a',
        color: '#ffffff',
        customClass: {
          popup: 'sweet-alert-dark',
          title: 'sweet-alert-title',
          confirmButton: 'sweet-alert-button',
        },
      });
    }
  } catch (error: unknown) {
    console.error('Submit error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again later.';
    await Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#f44336',
      background: '#1a1a1a',
      color: '#ffffff',
      customClass: {
        popup: 'sweet-alert-dark',
        title: 'sweet-alert-title',
        confirmButton: 'sweet-alert-button',
      },
    });
  } finally {
    if (loadingShown && $q && $q.loading) {
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

// SweetAlert2 dark theme styling
:deep(.sweet-alert-dark)
  background-color: #1a1a1a !important
  border: 1px solid #333 !important

:deep(.sweet-alert-title)
  color: #ffffff !important
  font-family: $font-family !important

:deep(.sweet-alert-button)
  font-family: $font-family !important
  font-weight: 500 !important
  padding: 0.75rem 2rem !important
  border-radius: 8px !important
  transition: all 0.3s ease !important
  &:hover
    transform: translateY(-2px) !important
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important

:deep(.swal2-icon)
  border-color: #4caf50 !important
  color: #4caf50 !important

:deep(.swal2-icon.swal2-error)
  border-color: #f44336 !important
  color: #f44336 !important

:deep(.swal2-icon.swal2-error [class^=swal2-x-mark-line])
  background-color: #f44336 !important

:deep(.swal2-html-container)
  color: #e0e0e0 !important
  font-family: $font-family !important
</style>

