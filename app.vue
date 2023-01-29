<template>
  <NuxtLayout>
    <RouterView/>
  </NuxtLayout>
</template>

<script setup>
import { useAccountStore } from './stores/account';

const accountStore = useAccountStore()

useHead({
  title:"DabaQuestions"
})
</script>