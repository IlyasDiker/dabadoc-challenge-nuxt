<template>
    <div class="relative z-10 ease-in-out duration-300" aria-labelledby="modal-title" role="dialog" aria-modal="true"
        :class="openState ? 'opacity-100 visible' : 'opacity-0 invisible'">
        <div class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" @click="closeModal()"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto pointer-events-none">
            <div class="pointer-events-none flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ease-in-out duration-300"
                :class="openState ? 'opacity-100 translate-y-0 sm:scale-100': 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'">
                <div class="pointer-events-auto relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" :class="containerClass">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        openState: Boolean,
        closeable:  {
            type: Boolean,
            default: true
        },
        containerClass: String
    },
    methods:{
        closeModal(){
            if(!this.closeable) return;
            this.$emit('onClose');
        }
    }
}
</script>