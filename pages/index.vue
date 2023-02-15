<template>
    <div class="max-w-screen-md mx-auto py-6 px-4 flex flex-col">
        <AskQuestion @onSubmited="loadQuestions"/>

        <div class="flex flex-col mt-5 gap-3">
            <template v-if="questions.length > 0">
                <template v-for="(item, index) in questions" :key="index">
                   <QuestionCard :question="item"/>
                </template>
            </template>
            <template v-else-if="isLoading">
                <div class="text-center p-4">
                    Loading ...
                </div>
            </template>
            <template v-else>
                <div class="p-4 border rounded-lg shadow-sm flex-col text-gray-500 text-center">
                    <span>No Questions Found</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default{
    methods: {
        loadQuestions(){
            this.isLoading = true
            $fetch('/api/questions').then(data => {
                this.questions = data;
            }, ()=>{}).finally(()=>{
                this.isLoading = false;
            })
        }
    },
    data () {
        return {
            questions: [],
            isLoading: true
        }
    },
    created(){
        this.loadQuestions()
    }
}
</script>