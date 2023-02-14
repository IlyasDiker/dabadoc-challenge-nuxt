import { useAccountStore } from "~~/stores/account"

export default defineNuxtRouteMiddleware((to, from) => {
    const accountStore = useAccountStore();
    if (accountStore.isAuthenticated()) {
      return navigateTo('/')
    }
})