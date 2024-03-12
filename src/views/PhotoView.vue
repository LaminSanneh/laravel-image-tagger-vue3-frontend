<script setup>
import { reactive, ref, toRefs } from 'vue';
import PhotoComponent from '../components/photos/PhotoComponent.vue';
import { useRoute } from 'vue-router';
import photoService from '@/services/photoService';

// console.log($route);

const route = useRoute();

// to get route id
// console.log(route.params);

// const photo = ref({
//   id: 3,
//   title: 'Mercedes Blue 1',
//   url: '/images/mercedes-blue-1.png'
// });

let photo = ref({});
let tags = ref([]);

photoService.getPhoto(route.params.id).then((photoData) => {
  // console.log(photoData);
  photo.value = { ...photoData };
  // TODO: Is tags needed here.
  // Consider using it for toggling on homepage in a read-only manner.
  tags.value = [...photoData.tags];
});
</script>

<template>
  <main v-if="photo.id">
    <PhotoComponent :photo="photo" :tags="tags" />
  </main>
</template>
