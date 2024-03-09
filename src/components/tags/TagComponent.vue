<template>
  <div class="tag-details" :class="{ 'tag-is-open': isOpen }">
    <div class="tag-header">
      <div v-on:click="toggleTagOpen" class="tag-opener-closer"></div>
      <div class="tag-delete"></div>
    </div>
    <div class="tag-body">
      <p class="tag-title">{{ title }}</p>
      <form v-on:submit.prevent="saveTagTitle" class="tag-form">
        <input
          @input="(event) => (title = event.target.value)"
          :value="title"
          type="text"
          placeholder="Add Tag Title here"
        />
      </form>
    </div>
  </div>
</template>

<script>
import tagService from '@/services/tagService';
import { ref, watch } from 'vue';

export default {
  props: {
    tag: Object,
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const title = ref(props.tag.tag_title);
    const isOpen = ref(props.isEditing);
    const id = ref(props.tag.id);

    watch(props.tag, (newTag, oldTag) => {
      title.value = newTag.tag_title;
    });

    return {
      title,
      isOpen,
      id
      // isEditing
    };
  },
  methods: {
    toggleTagOpen() {
      this.isOpen = !this.isOpen;
    },
    saveTagTitle() {
      if (this.id) {
        const tagData = { tag_title: this.title };
        tagService.updateTag(this.id, tagData).then((updatedTagData) => {
          console.log('Updated tag with data:');
          console.log(updatedTagData);
          this.$emit('tagUpdated', updatedTagData);
        });
      } else {
        const tagData = {
          tag_title: this.title,
          x_offset: this.$props.tag.x_offset,
          y_offset: this.$props.tag.y_offset
        };

        tagService.saveTagForPhoto(this.tag.photo_id, tagData).then((newTagData) => {
          console.log('Created tag for photo with data:');
          console.log(newTagData);
          this.$emit('newTagCreated', newTagData);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-body {
  .tag-title,
  input {
    width: 150px;
  }
}
.tag-title {
  display: block;
  background-color: #5f5f5f;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 3px 5px;
}
.tag-form {
  display: none;
  input {
    border: 1px solid #000000;
    border-radius: 3px;
    padding: 5px;
  }
}
.tag-form,
.tag-title {
  margin-left: 15px;
}
.tag-opener-closer {
  $tag-opener-closer-width: 18px;
  border: 1px solid #000000;
  background-color: red;
  width: $tag-opener-closer-width;
  height: $tag-opener-closer-width;
  border-radius: 20px;
}
.tag-is-open {
  .tag-opener-closer {
    background-color: green;
  }
  .tag-title {
    display: none;
  }
  .tag-form {
    display: block;
  }
}
.tag-header {
  height: 15px;
}
</style>
