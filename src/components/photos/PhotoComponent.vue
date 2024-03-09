<template>
  <div>
    <p>My photo Component</p>
    <div class="single-photo">
      <h2 class="photo-title">{{ photo.title }}</h2>
      <div class="tags-and-image-container">
        <!-- <div class="tags-container"> -->
        <TagComponent
          v-for="tag in tagsList"
          v-bind:key="tag.id"
          :tag="tag"
          :style="{ left: tag.x_offset + '%', top: tag.y_offset + '%' }"
          class="tag-component-container"
          @tag-updated="tagUpdatedHandler"
        />
        <TagComponent
          v-show="newTagFormIsVisible"
          key="-1"
          :tag="newTagModel"
          :isEditing="true"
          :style="{ left: newTagModel.x_offset + '%', top: newTagModel.y_offset + '%' }"
          class="tag-component-container"
          @new-tag-created="newTagCreatedHandler"
        />
        <!-- </div> -->
        <img v-on:click="createNewTag" :src="photo.photo_url" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import TagComponent from '../tags/TagComponent.vue';

// import TagComponent from '../tags/TagComponent.vue';

export default {
  props: ['photo', 'tags'],
  components: {
    TagComponent
  },
  setup(props) {
    const tagsList = ref([...props.tags]);
    const newTagFormIsVisible = ref(false);
    const newTagModel = reactive({
      tag_title: 'New tag title',
      x_offset: 0,
      y_offset: 0,
      photo_id: 0
    });

    return {
      tagsList,
      newTagModel,
      newTagFormIsVisible
    };
  },
  methods: {
    createNewTag(event) {
      this.showNewTagForm();

      const photoWidth = event.srcElement.clientWidth;
      const photoHeight = event.srcElement.clientHeight;
      const mouseClickOffsetFromLeftOfImage = event.offsetX;
      const mouseClickOffsetFromTopOfImage = event.offsetY;
      const absolutePercentageX = (mouseClickOffsetFromLeftOfImage / photoWidth) * 100;
      const absolutePercentageY = (mouseClickOffsetFromTopOfImage / photoHeight) * 100;

      this.newTagModel.tag_title = 'New tag title';
      this.newTagModel.x_offset = absolutePercentageX;
      this.newTagModel.y_offset = absolutePercentageY;
      this.newTagModel.photo_id = this.photo.id;
    },
    newTagCreatedHandler({ id, tag_title, x_offset, y_offset, photo_id }) {
      this.tagsList.push({
        id,
        tag_title,
        x_offset,
        y_offset,
        photo_id
      });
      this.hideNewTagForm();
    },
    tagUpdatedHandler(updatedTagData) {
      debugger;
      // this.tagsList.push(updatedTagData);
    },
    hideNewTagForm() {
      this.newTagFormIsVisible = false;
    },
    showNewTagForm() {
      this.newTagFormIsVisible = true;
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
