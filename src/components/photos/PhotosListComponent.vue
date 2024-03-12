<script>
import { ref } from 'vue';
import Dropzone from 'dropzone';
import photoService from '@/services/photoService';
import 'dropzone/dist/dropzone.css';

export default {
  setup() {
    let photosList = ref([]);

    photoService.getPhotos().then((fetchedPhotos) => (photosList.value = fetchedPhotos));

    console.log('setup');
    return {
      photosList
    };
  },
  mounted() {
    const myDropzone = new Dropzone(this.$refs.myDropZoneRef, {
      paramName: 'photo',
      url: 'http://localhost:8000/api/photos'
      // autoProcessQueue: false
    });

    myDropzone.on('success', (file, results, xhr) => {
      this.pushNewlyUploadedImageData(results);
    });
  },
  methods: {
    pushNewlyUploadedImageData(imageAttributes) {
      this.photosList.push(imageAttributes);
    }
  }
};
</script>

<template>
  <div>
    <h2>Uploader</h2>
    <div class="uploader-container">
      <form action="/api/photos" class="dropzone" ref="myDropZoneRef"></form>
    </div>
    <h2>Photos List</h2>
    <div class="photos-list">
      <div class="single-photo" v-for="photo in photosList" :key="photo.id">
        <h2 class="photo-title">{{ photo.photo_title }}</h2>
        <RouterLink class="photo-link" :to="{ name: 'photo-view', params: { id: photo.id } }">
          <div class="image-tag-container"><img :src="photo.photo_url" alt="" srcset="" /></div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photos-list {
  // text-align: center;
}
.single-photo {
  margin: 0 auto 20px;
  // margin-bottom: 20px;
  width: 80%;

  img {
    max-width: 100%;
  }
}

.photo-link {
  padding: 0;
}

.image-tag-container {
  background-color: #ffffff;
  line-height: 0;
  box-shadow: 0 2px 43px -4px rgba(255, 255, 255, 0.19);
}

.photo-title {
  margin-bottom: 10px;
}
</style>
