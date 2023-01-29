<template>
    <div class="max-w-screen-md mx-auto py-6 px-4 flex flex-col">
        <AskQuestion @onSubmited="loadQuestions()"/>

        <div class="flex flex-col mt-5 gap-3">
            <template v-for="(item, index) in questions" :key="index">
               <QuestionCard :question="item"/>
            </template>
        </div>
    </div>
</template>

<script>
export default{
    methods: {
        loadQuestions(){
            $fetch('/api/questions').then(data => {
                this.questions = data;
            })
        }
    },
    data () {
        return {
            questions: []
        }
    },
    created(){
        this.loadQuestions()
    }
}
</script>