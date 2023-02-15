<template>
    <div class="p-4 border rounded-lg shadow-md">
        <div class="flex flex-row justify-between items-start">
            <span class="text-lg font-semibold">{{ question.title }}</span>
            <span class="text-gray-500 text-sm">{{ question.content }}</span>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        question: Object
    }
}
</script>