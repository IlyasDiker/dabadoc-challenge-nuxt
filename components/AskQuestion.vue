<template>
    <section class="p-4 border rounded-lg shadow-md">
        <form @submit.prevent="onSubmit">
            <div class="grid grid-cols-4 gap-x-4 gap-y-3">
                <div class="col-span-3 input-wrapper">
                    <label for="title">Title</label>
                    <input id="title" type="text" name="title" v-model="FormData.title" required>
                </div>
                <div class="col-span-1 input-wrapper">
                    <label for="location">Location</label>
                    <input id="location" type="text" name="location" v-model="FormData.location" required>
                </div>
                <div class="col-span-full input-wrapper">
                    <label for="content">Content</label>
                    <textarea id="content" name="content" v-model="FormData.content" required></textarea>
                </div>
                <div class="col-span-full">
                    <button class="button-primary"
                        type="submit">Submit</button>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import createQuestion from '~~/composables/questions/createQuestion'
export default{
  methods: {
    onSubmit(){
        createQuestion(this.FormData.title, this.FormData.location, this.FormData.content).then((data) => {
            console.log(data);
            this.$emit('onSubmited');
        })
    }
  },
  data () {
    return {
        FormData:{
            title: '',
            location: '',
            content: ''
        }
    }
  },

}
</script>