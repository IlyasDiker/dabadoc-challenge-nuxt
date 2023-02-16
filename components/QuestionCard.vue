<template>
    <div class="border rounded-lg shadow-md flex flex-col overflow-hidden">
        <div class="flex flex-col sm:flex-row-reverse">
            <template v-if="question.coordinate">
                <img class="w-full sm:max-w-xs object-cover" 
                :src="getPreviewImage()">
            </template>
            <div class="flex flex-col justify-between p-4 flex-grow">
                <div class="flex flex-col">
                    <span class="text-2xl font-bold leading-7 text-gray-900 text-ellipsis sm:text-2xl sm:tracking-tight">
                        {{ question.title }}
                    </span>
                    <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div class="mt-2 flex items-center text-sm text-gray-500">
                            <!-- Heroicon name: mini/calendar -->
                            <svg class="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ new Date(question.createdAt).toLocaleDateString() }}
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500" v-if="question.coordinate">
                            <!-- Heroicon name: mini/map-pin -->
                            <svg class="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{{ question.coordinate.lng }}, {{ question.coordinate.lat }}</span>
                        </div>
                    </div>
                    <span class="mt-3 text-gray-700">{{ question.content }}</span>
                </div>
                <div class="flex flex-row gap-3 mt-3">
                    <button class="w-8 h-8 rounded-full flex justify-center items-center p-2 transition-colors" 
                    @click="likeQuestion" 
                    :class="isLiked() ? 'bg-red-200 text-red-500' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    </button>
                    <div class="flex flex-row items-center gap-3">
                        <button class="w-8 h-8 rounded-full flex justify-center items-center p-2 transition-colors bg-gray-200 text-gray-500 hover:bg-gray-300" @click="$emit('onComment', question.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 00-.266.112L8.78 21.53A.75.75 0 017.5 21v-3.955a48.842 48.842 0 01-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <template v-if="question.comments && question.comments.length > 0">
                            <a @click="isExpanded = !isExpanded" class="text-gray-500 select-none cursor-pointer hover:underline">{{ question.comments.length }} {{ question.comments.length > 1 ? 'comments' : 'comment' }}</a>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col px-4 bg-gray-50 transition-all"
            :class="isExpanded ? 'border-t py-4 max-h-[300px] overflow-auto':'max-h-[0] overflow-hidden'"
            v-if="question.comments && question.comments.length > 0">
            <ul class="flex flex-col-reverse">
                <template v-for="(item, index) in question.comments" :key="index">
                    <li class="flex text-sm flex-row gap-3 pt-2 pb-2 border-b last:pt-0 first:pb-0 first:border-none">
                        <div class="w-10 h-10 bg-gray-300 animate-pulse rounded-full" role="presentation"></div>
                        <div class="flex flex-col">
                            <span class="font-semibold text-gray-700">{{ item.user.username }}</span>
                            <span class="text-gray-800">{{ item.message }}</span>
                            <span class="text-xs text-gray-500">{{ moment(item.createdAt).fromNow() }}</span>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import likeQuestion from '~~/composables/questions/likeQuestion'
import { useAccountStore } from '~~/stores/account'
export default {
    methods: {
        isLiked(){
            if(!this.accountStore.isAuthenticated()) return false;
            if(this.question.favoritedBy && this.question.favoritedBy.findIndex(x => x.userId == this.accountStore.account.id) != -1){
                return true
            }
            return false;
        },
        likeQuestion(){
            if(!this.accountStore.isAuthenticated()) return false;
            likeQuestion(this.question.id).then((data)=>{
                if(data){
                    this.question.favoritedBy.push(data)
                } else {
                    let indexFav = this.question.favoritedBy.findIndex(x => x.userId == this.accountStore.account.id)
                    if(indexFav != -1){
                        this.question.favoritedBy.splice(indexFav, 1);
                    }
                }
            })
        },
        getPreviewImage(){
            if(!this.question.coordinate) return;
            const runtimeConfig = useRuntimeConfig();
            let url = new URL('https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geoPoint/coords/500x300')
            url.pathname = url.pathname.replace('geoPoint', `geojson(${
                JSON.stringify(
                    {type:"Point", coordinates:[this.question.coordinate.lng,this.question.coordinate.lat]}
                    )})`)
            url.pathname = url.pathname.replace('coords', `${this.question.coordinate.lng},${this.question.coordinate.lat},12`)
            url.searchParams.set('access_token', runtimeConfig.public.MAPBOX_KEY || '')
            return url.toString('access_token')
        }
    },
    data () {
        return {
            isExpanded: false,
        }
    },
    props: {
        question: Object
    },
    setup(){
        const accountStore = useAccountStore();
        return {moment, accountStore}
    }
}
</script>