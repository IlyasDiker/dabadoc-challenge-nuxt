<template>
    <div class="p-4 border rounded-lg shadow-md">
        <span>{{ question.title }}</span>
        <span>{{ question.content }}</span>
    </div>
</template>

<script>
export default{
    props:{
        question: Object
    }
}
</script>