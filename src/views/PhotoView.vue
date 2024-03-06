<script setup>
import { reactive, ref, toRefs } from 'vue';
import PhotoComponent from '../components/photos/PhotoComponent.vue';
import { useRoute } from 'vue-router';

// console.log($route);

const route = useRoute();

// to get route id
console.log(route.params);

const photo = ref({
  id: 3,
  title: 'Mercedes Blue 1',
  url: '/images/mercedes-blue-1.png'
});
</script>

<template>
  <main>
    <PhotoComponent :photo="photo" />
  </main>
</template>
