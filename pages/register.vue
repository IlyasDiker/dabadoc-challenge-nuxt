<template>
    <div class="relative flex min-h-screen justify-center md:px-12 lg:px-0">
        <div class="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
            <div class="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
                <div class="flex flex-col">
                    <NuxtLink aria-label="Home" to="/">
                        <IconApp/>
                    </NuxtLink>
                    <div class="mt-20">
                        <h2 class="text-lg font-semibold text-gray-900">Get started for free</h2>
                        <p class="mt-2 text-sm text-gray-700">Already registered?
                            <NuxtLink class="font-medium text-blue-600 hover:underline" to="/login">Sign in</NuxtLink> to your
                            account.</p>
                    </div>
                </div>
                <form action="#" class="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                    <div class="">
                        <label for="first_name" class="mb-3 block text-sm font-medium text-gray-700">
                            First name
                        </label>
                        <input id="first_name" type="text" name="first_name" autocomplete="given-name"
                            required=""
                            class="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm">
                    </div>
                    <div class=""><label for="last_name" class="mb-3 block text-sm font-medium text-gray-700">Last
                            name</label><input id="last_name" type="text" name="last_name" autocomplete="family-name"
                            required=""
                            class="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm">
                    </div>
                    <div class="col-span-full"><label for="email"
                            class="mb-3 block text-sm font-medium text-gray-700">Email address</label><input id="email"
                            type="email" name="email" autocomplete="email" required=""
                            class="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm">
                    </div>
                    <div class="col-span-full"><label for="password"
                            class="mb-3 block text-sm font-medium text-gray-700">Password</label><input id="password"
                            type="password" name="password" autocomplete="new-password" required=""
                            class="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm">
                    </div>
                    <div class="col-span-full"><button
                            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
                            type="submit"><span>Sign up <span aria-hidden="true">→</span></span></button></div>
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
export default {
    setup(){
        definePageMeta({
            layout: "auth",
        });
    }
}
</script>