<script setup lang="ts">
import { ref, computed } from 'vue'
import { SUBNET_OPTIONS } from '@/lib/subnetOptions'
import { isIpValid, getNetworkAddress, getAddressesCount } from '@/lib/subnetUtils'
import { UiInput, UiSelect, UiButton, UiField } from 'krekyer-ui-components'

const ip = ref('')
const mask = ref(SUBNET_OPTIONS[0])
const options = [...SUBNET_OPTIONS]

const isFormValid = computed(() => isIpValid(ip.value))

const showResult = ref(false)

function handleSubmit() {
  if (isFormValid.value) {
    showResult.value = true
  }
}

const networkAddress = computed(() => getNetworkAddress(ip.value, mask.value))
const addressesCount = computed(() => getAddressesCount(mask.value))
</script>

<template>
  <div class="calculator">
    <form @submit.prevent="handleSubmit" class="calculator__form">
      <h2 class="calculator__title">IP-калькулятор подсети</h2>
      <div class="calculator__fields">
        <UiInput
          v-model="ip"
          :class="{ 'input--error': ip && !isFormValid }"
        />
        <UiSelect v-model="mask" :options="options" />
        <UiButton type="submit" :disabled="!isFormValid" variant="primary">
          Рассчитать
        </UiButton>
      </div>
    </form>

    <div v-if="showResult" class="calculator__result">
      <UiField label="IP-адрес" class="result-field">{{ ip }}</UiField>
      <UiField label="Маска подсети" class="result-field">{{ mask }}</UiField>
      <UiField label="Адрес сети" class="result-field">{{ networkAddress }}</UiField>
      <UiField label="Количество хостов" class="result-field">{{ addressesCount }}</UiField>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.calculator__title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.calculator__form {
  margin-bottom: 2rem;
}

.calculator__fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.input--error {
  border-color: var(--color-error) !important;
}

.calculator__result {
  padding: 1.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.result-field {
  margin-bottom: 1rem;
}

.result-field .ui-field__label {
  margin-bottom: 0.25rem;
}
</style>