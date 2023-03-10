// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/scss/main.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
    runtimeConfig: {
        JWT_SECRET: process.env.JWT_SECRET || 'secret',
        public:{
            MAPBOX_KEY: process.env.MAPBOX_KEY,
        }
    }
})
