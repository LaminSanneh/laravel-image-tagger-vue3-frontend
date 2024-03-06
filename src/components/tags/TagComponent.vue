<template>
  <div class="tag-details" :class="{ 'tag-is-open': tagIsOpen }">
    <div class="tag-header">
      <div v-on:click="toggleTagOpen" class="tag-opener-closer"></div>
      <div class="tag-delete"></div>
    </div>
    <div class="tag-body">
      <p class="tag-title">{{ title }}</p>
      <form class="tag-form">
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
import { ref } from 'vue';

export default {
  setup() {
    const title = ref('Temp title');
    const tagIsOpen = ref(false);

    return {
      title,
      tagIsOpen
    };
  },
  methods: {
    toggleTagOpen() {
      this.tagIsOpen = !this.tagIsOpen;
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
