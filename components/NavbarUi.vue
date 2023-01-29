<template>
    <nav class="bg-gray-900 text-gray-50">
        <div class="container mx-auto py-3 px-4">
            <div class="flex flex-row justify-between items-center">
                <NuxtLink to="/"><IconApp class="text-white"/></NuxtLink>
                <div class="flex flex-row items-center gap-5">
                    <nuxt-link to="login">Login</nuxt-link>
                    <nuxt-link to="register">Register</nuxt-link>
                </div>
            </div>
        </div>
    </nav>
</template>