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
        :multiple="multiple"
        accept="image/*"
        @change="fileSelected"
      />

      <label class="custom-file-label" for="customFileLang"
        >Seleccionar Archivo</label
      >
    </div>
    <div class="file-image-input--preview">
      <div v-if="!multiple" class="file-image-input--preview-single">
        <p v-if="singleUrl" class="file-image-input--name" alt="">
          <a :href="singleUrl" target="_blank">{{ singleUrl }}</a>
        </p>
      </div>
      <div v-else class="file-image-input--preview-multiple">
        <div
          v-for="(item, index) in currentImages"
          :key="index"
          class="file-image-input--item"
        >
          <p class="file-image-input--name" alt="">
            <select v-if="showLevelControl" class="form-control level-control" id="">
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
            </select>
            <a :href="item" target="_blank">{{ item.filename }}</a>
          </p>

          <span
            class="file-image-input--item-close"
            @click="removeImage(item.filename, index)"
          >
            <button type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </span>
        </div>
        <div
          v-for="(item, index) in urlImages"
          :key="'current' + index"
          class="file-image-input--item"
        >
          <p class="file-image-input--name" alt="">
            <select v-if="showLevelControl" class="form-control level-control" id="">
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
            </select>
            <a :href="item" target="_blank">{{ item }}</a>
          </p>

          <span
            class="file-image-input--item-close"
            @click="removeImage(null, index)"
          >
            <button type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imageFile",
  components: {},
  data: function () {
    return {
      images: [],
      singleUrl: "",
      urlImages: [],
      currentImages: []
    };
  },
  mounted() {
    this.currentImages = this.uploadImages.filter(
      (elem) => elem.field === this.name
    );
    
    if (this.currentImages[0])
      this.singleUrl = !this.multiple ? this.currentImages[0].url : null;
  },
  methods: {
    emitChange() {
      this.$emit("inputChange", {
        val: this.multiple ? Array.from(this.images) : this.images,
        name: this.name,
        multiple: this.multiple,
      });
    },
    fileSelected(e) {
      this.images = this.multiple ? e.target.files : e.target.files[0];

      if (this.multiple) {
        var d = this.images;
        d.forEach((element) => {
          this.urlImages.push(element.name);
        });
      } else {
        this.singleUrl = URL.createObjectURL(this.images);
      }

      this.emitChange();
    },
    removeImage(filename, index) {
      const dataToModify = filename ? this.currentImages : this.urlImages;
      dataToModify.splice(index, 1);
      this.$emit("removeImage", {
        filename: filename,
        index: index,
        name: this.name,
      });
    },
  },
  props: {
    showLevelControl: {
      type: Boolean,
      default: false,
    },
    label: String,
    levels: Number,
    name: String,
    classes: String,
    required: Boolean,
    multiple: Boolean,
    uploadImages: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
.file-image-input label {
  margin-bottom: 5px;
}

.file-image-input--preview {
  padding-top: 15px;
}
.file-image-input--preview-multiple {
  flex-direction: row;
  align-items: initial;
}

.file-image-input--item {
  display: inline-block;
  width: 100%;
  flex: 1;
  position: relative;
}
.file-image-input--name {
  padding: 5px;
  border-bottom: 1px solid #ddd;
  margin-top: 0;
  margin-bottom: 10px;
  position: relative;
}

.file-image-input--name .level-control {
  width: 90px;
  display: inline-block;
  margin-right: 10px;
}

.file-image-input--item-close {
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 5px;
}
</style>