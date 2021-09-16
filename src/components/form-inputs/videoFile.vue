<template>
  <div class="file-image-input">
    <label :for="name">{{ label }}</label>
    <div class="custom-file">
      <input
        type="file"
        ref="foliageTableImage"
        class="custom-file-input"
        id="customFileLang"
        :class="classes"
        :name="name"
        :required="required"
        accept="video/*"
        @change="fileSelected"
        
      />

      <label class="custom-file-label" for="customFileLang"
        >Seleccionar Archivo</label
      >
      
    </div>
    <div class="file-image-input--preview">
      <div v-if="!multiple" class="file-image-input--preview-single">
        <p
          v-if="singleUrl"
          class="file-image-input--name"
          alt=""
        >{{singleUrl.name}}</p>
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  name: "videoFile",
  components: {},
  data: function () {
    return {
      images: [],
      singleUrl: "",
      urlImages: [],
      currentImages: [],
    };
  },
  mounted() {
    this.currentImages = this.uploadImages.filter(
      (elem) => elem.field === this.name
    );
    if(this.currentImages[0])
    this.singleUrl = !this.multiple ? this.currentImages[0].url : null;
  },
  methods: {
    emitChange() {
      this.$emit("inputChange", {
        val: this.images,
        name: this.name,
      });
    },
    fileSelected(e) {
      this.images = e.target.files[0];
      this.singleUrl = this.images;
      this.emitChange();
    },
    removeImage(filename, index) {
      const dataToModify = filename ? this.currentImages: this.urlImages;
      dataToModify.splice(index, 1);
      this.$emit("removeImage", {'filename': filename, 'index': index, 'name': this.name});
    },
    
  },
  props: {
    label: String,
    name: String,
    classes: String,
    required: Boolean,
    multiple: Boolean,
    uploadImages: {
      type: Array,
      default: () => []
    },
  },
};
</script>
<style scoped>
.file-image-input label{
  margin-bottom: 5px;
}

.file-image-input--preview {
  padding-top: 10px;
}
.file-image-input--preview-multiple {
  flex-direction: row;
  align-items: initial;
}

.file-image-input--item {
  display: inline-block;
  width: 140px;
  height: 140px;
  flex: 1;
  margin: 0 10px;
  position: relative;
}
.file-image-input--name {
  height: 40px;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  margin-top: 0;
  margin-bottom: 10px;
}

.file-image-input--item-close {
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 5px;
}
</style>