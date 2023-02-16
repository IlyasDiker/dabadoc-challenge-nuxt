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
    },
    data () {
        return {
            questions: [],
            isLoading: true,
            gpsState: 'notfixed',
            coords: null,
        }
    },
    created(){
        this.loadGps().finally(()=>{
            this.loadQuestions()
        });
    }
}
</script>