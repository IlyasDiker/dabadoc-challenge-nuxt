<template>
    <nav class="bg-gray-900 text-gray-50">
        <div class="container mx-auto py-3 px-4">
            <div class="flex flex-row justify-between items-center">
                <NuxtLink to="/"><IconApp class="text-white"/></NuxtLink>
                <div class="flex flex-row items-center gap-3">
                    <template  v-if="!accountStore.isAuthenticated()">
                        <nuxt-link class="nav-item" to="login">Login</nuxt-link>
                        <nuxt-link class="nav-item primary" to="register">Register</nuxt-link>
                    </template>
                    <template v-else>
                        <a class="nav-item danger" @click="accountStore.logout()">Logout</a>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useAccountStore } from '~~/stores/account';

const accountStore = useAccountStore();
</script>

<style lang="scss" scoped>
.nav-item{
    @apply py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer
     flex flex-row gap-3 items-center;
    &.primary{
        @apply bg-blue-600 hover:bg-blue-700;
    }
    &.danger{
        @apply hover:bg-red-800;
    }
}

</style>