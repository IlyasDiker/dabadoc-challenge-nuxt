<template>
    <nav class="bg-gray-900 text-gray-50">
        <div class="container mx-auto py-3 px-4">
            <div class="flex flex-row justify-between items-center">
                <NuxtLink to="/"><IconApp class="text-white"/></NuxtLink>
                <div class="flex flex-row items-center gap-5">
                    <template  v-if="!accountStore.isAuthenticated()">
                        <nuxt-link to="login">Login</nuxt-link>
                        <nuxt-link to="register">Register</nuxt-link>
                    </template>
                    <template v-else>
                        <a @click="accountStore.logout()">Logout</a>
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