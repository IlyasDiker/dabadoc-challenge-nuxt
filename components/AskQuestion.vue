<template>
    <section class="p-4 border rounded-lg shadow-md">
        <div tabindex="0" class="flex flex-col gap-x-4 gap-y-3 relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-4 rounded"
         @click="FormModal = true" @keypress.enter="FormModal = true"
         aria-label="Create new Question">
            <div class="input-wrapper pointer-events-none">
                <input id="title" tabindex="-1" type="text" readonly name="title" placeholder="Title" required>
            </div>
            <div class="input-wrapper pointer-events-none">
                <textarea id="content" tabindex="-1" readonly name="content" placeholder="Write a Question..." required></textarea>
            </div>
        </div>
    </section>
    <ModalUi :openState="FormModal" @onClose="FormModal = false" containerClass="w-full md:max-w-screen-md">
        <form @submit.prevent="onSubmit">
            <div class="flex flex-col sm:flex-row bg-white">
                <div id="MapBoxContainer">
                </div>
                <div class="flex-grow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="flex items-start">
                        <div class="mt-3 sm:mt-0 w-full">
                            <div class="flex flex-col gap-x-4 gap-y-3" @click="FormModal = true">
                                <div class="input-wrapper">
                                    <label for="title">Title</label>
                                    <input id="title" type="text" name="title" v-model="FormData.title" required>
                                </div>
                                <div class="input-wrapper">
                                    <label for="content">Content</label>
                                    <textarea id="content" name="content" rows="6" v-model="FormData.content" required></textarea>
                                </div>
                                <div class="input-wrapper">
                                    <label for="location">Location</label>
                                    <div class="relative">
                                        <input id="location" type="text" name="location" v-model="FormData.location"
                                            required>
                                        <button class="gpsIcon" type="button" @click.stop="loadGps">
                                            <IconGpsFixed />
                                        </button>
                                    </div>
                                </div>
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
import createQuestion from '~~/composables/questions/createQuestion'
import mapboxgl from 'mapbox-gl'

export default {
    emits:['onSubmited'],
    methods: {
        loadGps() {
            if (this.gpsState == 'disabled') return
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    this.FormData.location = `${pos.coords.longitude}, ${pos.coords.latitude}`
                    this.setCurrentLocationMarker([pos.coords.longitude, pos.coords.latitude])
                })
            }
        },
        onSubmit() {
            createQuestion(this.FormData.title, this.FormData.location, this.FormData.content).then((data) => {
                this.$emit('onSubmited');
                this.FormModal = false;
            })
        },
        cancelForm(){
            this.FormModal = false;
    
        },
        /* @param coords [x,y] */
        setCurrentLocationMarker(coords){
            if(!coords || coords[0] == null || coords[1] == null) return;
            if(!this.currentLocationMarker){
                let markertOptions= {
                    draggable: true
                };
                this.currentLocationMarker = new mapboxgl.Marker(markertOptions)
                    .setLngLat(coords).addTo(this.mapInstance);
                this.currentLocationMarker.on('dragend', this.onCurrentLocationMarkerDragEnd)
            } else {
                this.currentLocationMarker.setLngLat(coords);
            }
            this.mapInstance.flyTo({center:coords, zoom:14})
        },
        onCurrentLocationMarkerDragEnd(){
            let latLng = this.currentLocationMarker.getLngLat();
            this.FormData.location = `${latLng.lng}, ${latLng.lat}`;
        },
        onMapDblClick(e){
            console.log(e);
            if(!e.latLng) return;
            this.setCurrentLocationMarker([e.latLng.lng, e.latLng.lat]);
        }
    },
    data() {
        return {
            FormModal: false,
            gpsState: 'notfixed',
            FormData: {
                title: '',
                location: '',
                content: ''
            },
            mapInstance: null,
            currentLocationMarker: null, 
        }
    },
    mounted(){
        this.mapInstance = new mapboxgl.Map({
            container: 'MapBoxContainer',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-7.0849336, 31.794525],
            zoom: 3,
        });
        this.mapInstance.on('dblclick', this.onMapDblClick)
    },
    setup(){
        const runtimeConfig = useRuntimeConfig();
        mapboxgl.accessToken = runtimeConfig.public.MAPBOX_KEY;
    }
}
</script>

<style lang="scss" scoped>
.gpsIcon {
    @apply absolute top-[50%] right-1 -translate-y-[50%] p-1 hover:bg-gray-200 rounded-full;
}

#MapBoxContainer{
    max-height: 500px;
    width: 40%;
    position: relative;
}
</style>

<style lang="scss">
.mapboxgl-control-container{
    display: none;
}
</style>

<style lang="scss">
@import 'mapbox-gl/dist/mapbox-gl.css';
</style>