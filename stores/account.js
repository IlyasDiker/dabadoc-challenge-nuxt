import { defineStore } from "pinia"

export const useAccountStore = defineStore('account', {
    state: () => ({ 
        account: null,
        authToken: null
    }),
    actions: {
        isAuthenticated(){
            return this.account && this.authToken
        },
        setAccount(account){
            this.account = account;
        },
        setSession(session){
            if(!session) return;
            this.setAccount(session.user)
            this.authToken = session.authToken;
        },
        getToken(){
            if(this.authToken){
                return `Bearer ${thus.authToken}`
            }
            return null
        },
        logout(){
            this.account = null;
            this.authToken = null;
            this.$reset();
        }
    },
    persist: true,
})