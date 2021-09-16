<template>
  <div class="custom-form-input">
    <label :for="name">{{ label }}</label>
      <div 
        v-for="(input, index) in state" 
        :key="index"
        class="custom-form-input--multiple">
        <input 
          @change="emitChange"
          type="text"
          ref="input"
          class="form-control"
          :class="classes"
          :name="name"
          v-model="state[index]"
          :required="required"
        />
      </div>
      <input
        @click="addInput"
        type="button"
        ref="input"
        class="btn btn-primary"
        value="Agregar"
      />
  </div>
</template>

<script>
export default {
  name: "inputMutipleText",
  components: {},
  data: function () {
    return {
      state: [''],
    }
  },
  created() {},
  methods: {
    emitChange() {
      this.$emit("inputChange", {'val': this.state, 'name': this.name});
    },
    addInput() {
      this.state.push('');
    },
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    name: String,
    value: String,
    classes: String,
    required: Boolean
  },
};
</script>
<style scoped>
.custom-form-input {
  margin-bottom: 15px;
  width: 50%;
}

.custom-form-input label {
  margin-bottom: 5px;
}
.custom-form-input input {
  height: 43px;
}
.custom-form-input .custom-form-input--multiple {
  margin-bottom: 15px;
}

</style>
