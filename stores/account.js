import { defineStore } from "pinia"

export const useAccountStore = defineStore('account', {
    state: () => ({ 
        count: 0, name: 'Eduardo' 
    }),
    actions: {
        
    },
})