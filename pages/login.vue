<template>
    <div class="relative flex min-h-screen justify-center md:px-12 lg:px-0">
        <div class="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
            <div class="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
                <div class="flex flex-col">
                    <NuxtLink aria-label="Home" to="/">
                        <IconApp/>
                    </NuxtLink>
                    <div class="mt-20">
                        <h2 class="text-lg font-semibold text-gray-900">Sign in to your account</h2>
                        <p class="mt-2 text-sm text-gray-700">
                            Don’t have an account? 
                            <NuxtLink class="font-medium text-blue-600 hover:underline" to="/register"> Sign up</NuxtLink>
                            for a free trial.
                        </p>
                    </div>
                </div>
                <form @submit.prevent="onSubmit" class="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                    <div class="col-span-full input-wrapper">
                        <label for="email">Email address</label>
                        <input id="email" v-model="FormData.email"
                            type="email" name="email" autocomplete="email" required>
                    </div>
                    <div class="col-span-full input-wrapper">
                        <label for="password">Password</label>
                        <input id="password" v-model="FormData.password"
                            type="password" name="password" autocomplete="new-password" required >
                    </div>
                    <div class="col-span-full">
                        <button
                            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
                            type="submit"><span>Sign in <span aria-hidden="true">→</span></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="hidden sm:contents lg:relative lg:block lg:flex-1"><img alt=""
            src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80" width="1664" height="1866" decoding="async"
            data-nimg="1" class="absolute inset-0 h-full w-full object-cover" loading="lazy"
            style="color: transparent;"></div>
    </div>
</template>

<script>
import loginrUser from '~~/composables/loginUser'
export default {
    methods: {
        onSubmit(){
            loginrUser(this.FormData.username, this.FormData.email, this.FormData.password).then((data)=>{
                console.log(data);
                this.$router.push('/');
            })
        }
    },
    data () {
        return {
            FormData:{
                username: '',
                email: '',
                password: '',
            }
        }
    },
    setup(){
        definePageMeta({
            layout: "auth",
            middleware: ["auth"],
        });
    }
}
</script>