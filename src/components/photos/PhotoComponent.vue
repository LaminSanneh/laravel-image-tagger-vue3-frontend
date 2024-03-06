<template>
  <div>
    <p>My photo Component</p>
    <div class="single-photo">
      <h2 class="photo-title">{{ photo.title }}</h2>
      <div class="tags-and-image-container">
        <!-- <div class="tags-container"> -->
        <TagComponent
          v-for="tag in tags"
          :style="{ left: tag.xOffset + '%', top: tag.yOffset + '%' }"
          class="tag-component-container"
        />
        <!-- </div> -->
        <img v-on:click="createNewTag" :src="photo.url" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import TagComponent from '../tags/TagComponent.vue';

// import TagComponent from '../tags/TagComponent.vue';

export default {
  props: ['photo'],
  components: {
    TagComponent
  },
  setup(props) {
    // console.log(props);
    // console.log(props.photo);
    // console.log({ ...props.photo });

    const photo = props.photo;
    const tags = ref([
      {
        xOffset: 0,
        yOffset: 0
      },
      {
        xOffset: 0,
        yOffset: 20
      },
      {
        xOffset: 20,
        yOffset: 0
      }
    ]);

    // console.log(photo);

    // console.log(props);

    return {
      photo,
      tags
    };
  },
  methods: {
    createNewTag(event) {
      // ( (pageX- 474) /972) * 100;

      // photoWidth = event.srcElement.clientWidth;
      // photoLeftOffsetFromPageBeginning = (pageWidth - photoWidth) / 2;
      // // or
      // photoLeftOffsetFromPageBeginning = event.srcElement.x;

      // pageX = event.pageX;

      // absolutePercentage = (pageX - (photoLeftOffsetFromPageBeginning) / photoWidth) * 100;

      console.log(event, 'hello');
      // const = photoLeftOffsetFromPageBeginning = (pageWidth - photoWidth) / 2;
      // or
      const photoWidth = event.srcElement.clientWidth;
      const photoHeight = event.srcElement.clientHeight;

      // const photoLeftOffsetFromPageBeginning = event.srcElement.x;
      // const photoTopOffsetFromPageBeginning = event.srcElement.y;
      const mouseClickOffsetFromLeftOfImage = event.offsetX;
      const mouseClickOffsetFromTopOfImage = event.offsetY;
      const clickedPositionFromPagebeginningX = event.pageX;
      const clickedPositionFromPagebeginningY = event.pageY;
      // const absolutePercentageX =
      //   ((clickedPositionFromPagebeginningX - photoLeftOffsetFromPageBeginning) / photoWidth) * 100;
      // const absolutePercentageY =
      //   ((clickedPositionFromPagebeginningY - photoTopOffsetFromPageBeginning) / photoHeight) * 100;
      const absolutePercentageX = (mouseClickOffsetFromLeftOfImage / photoWidth) * 100;
      const absolutePercentageY = (mouseClickOffsetFromTopOfImage / photoHeight) * 100;

      debugger;
      this.tags.push({
        xOffset: absolutePercentageX,
        yOffset: absolutePercentageY
      });

      console.log(this.tags);
    }
  }
};
</script>

<style lang="scss" scoped>
.single-photo {
  margin: 0 auto 20px;
  // margin-bottom: 20px;
  position: relative;
  width: 80%;

  img {
    display: block;
    max-width: 100%;
  }
}

.tags-and-image-container {
  background-color: #ffffff;
  position: relative;
}

.photo-title {
  margin-bottom: 10px;
}

.tags-container {
  position: relative;
}

.tag-component-container {
  // background-color: #000000;
  position: absolute;
  // display: inline-block;
  // top: 100px;
  // left: 100px;
}
</style>
