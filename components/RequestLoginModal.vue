<template>
    <ModalUi :openState="openState" @onClose="$emit('onClose')" containerClass="w-full">
        <div class="flex flex-col px-4 py-5 w-full">
            <div class="text-center sm:text-left flex flex-col gap-3">
                <h3 class="text-xl font-semibold leading-6 text-gray-900" id="modal-title">Welcome Back</h3>
                <div class="">
                    <p class="text-sm text-gray-500">Please sign in to your account.</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-3 px-4 py-5 bg-gray-50">
            <RouterLink to="/login" class="rounded-md w-full bg-blue-600 px-3.5 py-1.5 text-base text-center font-semibold leading-7 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition">Login</RouterLink>
            <RouterLink to="/register" class="rounded-md w-full bg-gray-100 px-3.5 py-1.5 text-base text-center font-semibold leading-7 text-gray-800 shadow-sm border hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition">Register</RouterLink>
        </div>
    </ModalUi>
</template>

<script>
export default{
    props:{
        openState: Boolean,
        onClose: Function
    }
}
</script>