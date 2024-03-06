<script>
import { reactive, ref, toRefs } from 'vue';

export default {
  setup() {
    const tempPhotos = [
      {
        id: 1,
        title: 'BMW X5 Blue 1',
        url: '/images/bmw-x5-blue1.jpg'
      },
      {
        id: 2,
        title: 'Mercedes Red 1',
        url: '/images/mercedes-red-1.jpg'
      },
      {
        id: 3,
        title: 'Mercedes Blue 1',
        url: '/images/mercedes-blue-1.png'
      }
    ];

    let photosList = ref([]);

    photosList = tempPhotos;

    // const state = reactive({
    //     photosList: tempPhotos,
    // })

    return {
      photosList
      // ...toRefs(state),
    };
  }
};
</script>

<template>
  <div>
    <h1>Photos List</h1>
    <div class="photos-list">
      <div class="single-photo" v-for="photo in photosList">
        <h2 class="photo-title">{{ photo.title }}</h2>
        <RouterLink class="photo-link" :to="{ name: 'photo-view', params: { id: photo.id } }">
          <div class="image-tag-container"><img :src="photo.url" alt="" srcset="" /></div>
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
}

.photo-title {
  margin-bottom: 10px;
}
</style>
