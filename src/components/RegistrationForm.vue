<template>
  <div class="registration-form">
    <PrivacyPolicySection
      v-model="privacyAccepted"
      class="q-mb-lg"
    />

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
      <a href="#" class="qr-link" @click.prevent="viewQRCode">
        View your QR ID here.
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import PrivacyPolicySection from 'components/PrivacyPolicySection.vue';
import { registrationService } from 'src/services/registrationService';

const router = useRouter();
const privacyAccepted = ref(false);

function handleRegister() {
  if (privacyAccepted.value) {
    void router.push('/register');
  }
}

async function viewQRCode() {
  const { value: email } = await Swal.fire({
    title: 'Enter your registered email address:',
    html: `
      <div style="width: 100%; margin-top: 1rem;">
        <input 
          id="swal-email-input" 
          class="swal2-input" 
          type="email" 
          placeholder="Email Address"
          style="background-color: #008B8B; color: white; border: 1px solid white; width: 100%; box-sizing: border-box;"
        />
      </div>
    `,
    background: '#000000',
    color: '#ffffff',
    showCancelButton: false,
    confirmButtonText: 'SUBMIT',
    confirmButtonColor: 'transparent',
    customClass: {
      popup: 'qr-modal-popup',
      title: 'qr-modal-title',
      confirmButton: 'qr-modal-submit-btn',
      closeButton: 'qr-modal-close-btn',
      container: 'qr-modal-container',
    },
    buttonsStyling: false,
    allowOutsideClick: true,
    allowEscapeKey: true,
    showCloseButton: true,
    focusConfirm: false,
    width: '500px',
    padding: '2rem',
    preConfirm: () => {
      const emailInput = document.getElementById('swal-email-input') as HTMLInputElement;
      const email = emailInput?.value;
      if (!email) {
        Swal.showValidationMessage('Please enter your email address');
        return false;
      }
      if (!/.+@.+\..+/.test(email)) {
        Swal.showValidationMessage('Please enter a valid email address');
        return false;
      }
      return email;
    },
  });

  if (email) {
    // Check if email exists in database and show QR code
    await Swal.fire({
      title: 'Loading...',
      text: 'Checking your registration...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const result = await registrationService.getRegistrationByEmail(email);

    if (result.success && result.data) {
      const registration = result.data;
      // Generate a simple QR code representation (you can replace this with actual QR code generation)
      const registrationId = registration.id.toString().padStart(6, '0');
      
      await Swal.fire({
        title: 'Registration Found!',
        html: `
          <div style="text-align: center; padding: 1rem 0;">
            <p style="color: #e0e0e0; margin-bottom: 1rem; font-size: 1rem;">Your Registration ID:</p>
            <div style="background: white; padding: 2rem; border-radius: 8px; display: inline-block; margin-bottom: 1rem;">
              <p style="color: #000; font-size: 1.5rem; font-weight: bold; margin: 0;">${registrationId}</p>
            </div>
            <div style="color: #888; font-size: 0.9rem; margin-top: 1rem;">
              <p style="margin: 0.25rem 0;">Name: ${registration.first_name} ${registration.last_name}</p>
              <p style="margin: 0.25rem 0;">Email: ${registration.email}</p>
              <p style="margin: 0.25rem 0;">Company: ${registration.company || 'N/A'}</p>
            </div>
          </div>
        `,
        icon: 'success',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonText: 'Close',
        confirmButtonColor: '#4caf50',
        customClass: {
          popup: 'qr-modal-popup',
          title: 'qr-modal-title',
          confirmButton: 'qr-modal-submit-btn',
        },
      });
    } else {
      await Swal.fire({
        title: 'Email Not Found',
        text: result.error || 'Email not found. Please check your email address.',
        icon: 'error',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f44336',
        customClass: {
          popup: 'qr-modal-popup',
          title: 'qr-modal-title',
          confirmButton: 'qr-modal-submit-btn',
        },
      });
    }
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

// QR Modal Styling
:deep(.qr-modal-container)
  z-index: 10000 !important

:deep(.qr-modal-popup)
  background-color: #000000 !important
  border: none !important
  border-radius: 8px !important
  padding: 2rem 2rem 1.5rem 2rem !important
  max-width: 500px !important
  width: 90% !important
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important

:deep(.qr-modal-title)
  color: #ffffff !important
  font-family: $font-family !important
  font-size: 1.1rem !important
  font-weight: 400 !important
  text-align: left !important
  margin: 0 0 1.5rem 0 !important
  padding: 0 !important
  line-height: 1.4 !important

:deep(.qr-modal-submit-btn)
  background: linear-gradient(#000000, #000000) padding-box, linear-gradient(to right, #FFD700, #9EFF00, #00CED1) border-box !important
  border: 2px solid transparent !important
  border-radius: 8px !important
  color: #ffffff !important
  font-family: $font-family !important
  font-weight: 500 !important
  font-size: 1rem !important
  letter-spacing: 2px !important
  text-transform: uppercase !important
  padding: 0.875rem 2.5rem !important
  min-width: 180px !important
  margin-top: 1.5rem !important
  transition: all 0.3s ease !important
  position: relative !important
  &:hover
    background: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)) padding-box, linear-gradient(to right, #FFD700, #9EFF00, #00CED1) border-box !important
    transform: translateY(-1px) !important

:deep(.qr-modal-close-btn)
  background: linear-gradient(#000000, #000000) padding-box, linear-gradient(to right, #9EFF00, #FFD700) border-box !important
  border: 2px solid transparent !important
  border-radius: 50% !important
  color: #ffffff !important
  width: 36px !important
  height: 36px !important
  display: flex !important
  align-items: center !important
  justify-content: center !important
  transition: all 0.3s ease !important
  font-size: 18px !important
  line-height: 1 !important
  padding: 0 !important
  top: 1rem !important
  right: 1rem !important
  &:hover
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)) padding-box, linear-gradient(to right, #9EFF00, #FFD700) border-box !important
    transform: scale(1.05) !important
  &:focus
    box-shadow: none !important

:deep(.swal2-input)
  background-color: #008B8B !important
  color: #ffffff !important
  border: 1px solid #ffffff !important
  border-radius: 4px !important
  padding: 0.875rem 1rem !important
  font-family: $font-family !important
  font-size: 1rem !important
  width: 100% !important
  margin: 0 !important
  box-sizing: border-box !important
  &::placeholder
    color: rgba(255, 255, 255, 0.8) !important
  &:focus
    outline: none !important
    border-color: #ffffff !important
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) !important

:deep(.swal2-html-container)
  margin: 0 !important
  padding: 0 !important

:deep(.swal2-actions)
  margin: 1.5rem 0 0 0 !important
  justify-content: center !important
</style>

