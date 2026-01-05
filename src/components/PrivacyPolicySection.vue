<template>
  <div class="privacy-policy-section">
    <q-checkbox
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      color="lime"
      class="privacy-checkbox"
    />
    <span class="text-white q-ml-sm">
      I have read and agreed to the Prism Code's
      <a href="#" class="privacy-link" @click.prevent="openPrivacyPolicy">
        Privacy Policy.
      </a>
      Please click before you proceed.
    </span>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const $q = useQuasar();

function openPrivacyPolicy() {
  // TODO: Implement privacy policy modal/page
  $q.notify({
    message: 'Privacy Policy will be displayed here',
    color: 'info',
  });
}
</script>

<style scoped lang="sass">
.privacy-policy-section
  display: flex
  align-items: center
  max-width: 600px
  text-align: left

.privacy-checkbox
  margin-top: -10px
  flex-shrink: 0
  :deep(.q-checkbox__inner)
    width: 20px
    height: 20px
    min-width: 20px
    min-height: 20px
  :deep(.q-checkbox__bg)
    border: 1px solid white !important
    border-radius: 0 !important
    background-color: #000000 !important
    width: 20px !important
    height: 20px !important
  :deep(.q-checkbox__bg--checked)
    background-color: #000000 !important
    border: 1px solid white !important
  :deep(.q-checkbox__check)
    color: white !important
    font-size: 14px
    font-weight: bold

.privacy-link
  color: #B0B0B0
  text-decoration: underline
  cursor: pointer
  &:hover
    color: white
</style>

