<template>
    <div class="max-w-screen-md mx-auto py-6 px-4 flex flex-col">
        <AskQuestion @onSubmited="loadQuestions"/>

        <div class="flex flex-col mt-5 gap-3">
            <template v-if="questions.length > 0">
                <template v-for="(item, index) in questions" :key="index">
                   <QuestionCard :question="item" @onComment="commentOnPost"/>
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
    <ModalUi :openState="commentModal" @onClose="cancelForm" containerClass="w-full md:max-w-screen-md">
        <form @submit.prevent="onSubmitComment">
            <div class="flex-grow px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-white">
                <div class="flex items-start">
                    <div class="mt-3 sm:mt-0 w-full">
                        <div class="flex flex-col gap-x-4 gap-y-3" @click="FormModal = true">
                            <div class="input-wrapper">
                                <textarea id="content" name="content" rows="6" placeholder="Write a comment..." v-model="FormData.message" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" 
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
                <button type="button" @click="cancelForm()"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
        </form>
    </ModalUi>
</template>

<script>
import createComment from '~~/composables/questions/comments/createComment';

export default{
    methods: {
        loadQuestions(){
            this.isLoading = true
            let params = {}
            if(this.coordinates){
                params.lng = this.coordinates.lng;
                params.lat = this.coordinates.lat;
            }
            $fetch('/api/questions', {
                params
            }).then(data => {
                this.questions = data;
            }, ()=>{}).finally(()=>{
                this.isLoading = false;
            })
        },
        loadGps() {
            return new Promise((resolve, reject) => {
                if (this.gpsState == 'disabled') return
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        this.coordinates = {lng: pos.coords.longitude, lat: pos.coords.latitude}
                        resolve(this.coordinates);
                    })
                }
            })
        },
        cancelForm(){
            this.commentModal = false;
            this.clearForm()
        },
        clearForm(){
            this.FormData.questionId = null;
            this.FormData.message = '';
        },
        onSubmitComment() {
            console.log(this.FormData.questionId);
            createComment(this.FormData.questionId, this.FormData.message).then((data)=>{
                console.log(data);
            })
        },
        commentOnPost(questionId) {
            this.FormData.questionId = questionId;
            this.commentModal = true;
        }
    },
    data () {
        return {
            questions: [],
            isLoading: true,
            gpsState: 'notfixed',
            coords: null,
            commentModal: false,
            FormData: {
                questionId: null,
                message: ''
            }
        }
    },
    mounted(){
        this.loadGps().finally(()=>{
            this.loadQuestions()
        });
    }
}
</script>