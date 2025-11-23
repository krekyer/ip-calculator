<script setup lang="ts">
import { ref } from 'vue'
import { UiInput, UiSelect, UiButton, UiField } from 'krekyer-ui-components'

const isShowResult = ref(false)
const ip = ref('')
const mask = ref('255.255.255.255')

const options = [
  '255.255.255.255', '255.255.255.254', '255.255.255.252', '255.255.255.248',
  '255.255.255.240', '255.255.255.224', '255.255.255.192', '255.255.255.128',
  '255.255.255.0', '255.255.254.0', '255.255.252.0', '255.255.248.0',
  '255.255.240.0', '255.255.224.0', '255.255.192.0', '255.255.128.0',
  '255.255.0.0', '255.254.0.0', '255.252.0.0', '255.248.0.0',
  '255.240.0.0', '255.224.0.0', '255.192.0.0', '255.128.0.0',
  '255.0.0.0', '254.0.0.0', '252.0.0.0', '248.0.0.0', '240.0.0.0',
  '224.0.0.0', '192.0.0.0', '128.0.0.0', '0.0.0.0'
]

function isIpValid(ip: string): boolean {
  return (
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip) &&
    ip.split('.').every((octet) => {
      const num = Number(octet)
      return num >= 0 && num <= 255
    })
  )
}

function showResult() {
  if (isIpValid(ip.value)) {
    isShowResult.value = true
  }
}

function getNetworkAddress(ip: string, mask: string): string {
  const ipOctets = ip.split('.')
  const maskOctets = mask.split('.')
  const result = ipOctets.map((oct, i) => Number(oct) & Number(maskOctets[i]))
  return result.join('.')
}

function getAddressesCount(mask: string): number {
  let binaryMask = ''
  for (const octet of mask.split('.')) {
    binaryMask += Number(octet).toString(2).padStart(8, '0')
  }
  const ones = binaryMask.split('').filter(b => b === '1').length
  const zeros = 32 - ones

  if (zeros === 0) return 1
  if (zeros === 1) return 2
  return Math.pow(2, zeros) - 2
}
</script>

<template>
  <form @submit.prevent="showResult" class="form">
    <h1 class="title">Калькулятор IP-сети</h1>
    <div class="container">
      <div class="input-wrapper">
      <UiInput v-model="ip" placeholder="Введите IP-адрес (например, 192.168.1.10)" />
      </div>
      <UiSelect v-model="mask" :options="options" />
      <UiButton type="submit" :disabled="!isIpValid(ip)" variant="primary">
        РАССЧИТАТЬ
      </UiButton>
    </div>
  </form>

  <div v-if="isShowResult && isIpValid(ip)" class="result">
    <UiField label="IP-адрес" class="result-field">
      {{ ip }}
    </UiField>
    <UiField label="Маска подсети" class="result-field">
      {{ mask }}
    </UiField>
    <UiField label="Адрес сети" class="result-field">
      {{ getNetworkAddress(ip, mask) }}
    </UiField>
    <UiField label="Количество адресов" class="result-field">
      {{ getAddressesCount(mask) }}
    </UiField>
  </div>
</template>

<style scoped>
.app {
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--color-background);
  color: var(--color-text);
}

.title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.form {
  margin-bottom: 2rem;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-secondary);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  max-width: 600px;
  width: 100%;     
  margin: 0 auto;  
}

.container {
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
}

.input-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.input-error {
  border-color: var(--color-error) !important;
}

.result {
  padding: 1.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  max-width: 600px; 
  width: 100%;    
  margin: 1.5rem auto 0;
}

.result-field {
  margin-bottom: 1rem;
}

.result-field .ui-field__label {
  margin-bottom: 0.25rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>

<style>
:root {
  --color-primary: #6e8efb;
  --color-primary-dark: #5a7be0;
  --color-secondary: #f3f4f6;
  --color-secondary-dark: #e5e7eb;
  --color-text: #4b5563;
  --color-text-light: #9ca3af;
  --color-background: #ffffff;
  --color-border: #d1d5db;
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;
}
</style>