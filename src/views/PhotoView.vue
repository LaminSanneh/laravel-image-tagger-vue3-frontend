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
  tags.value = [...photoData.tags];
  console.log([tags, photo]);
});
</script>

<template>
  <main v-if="photo.id">
    <PhotoComponent :photo="photo" :tags="tags" />
  </main>
</template>
