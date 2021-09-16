<template>
  <div class="sq-mngm-input custom-form-input">
    <label class="sq-mngm-input--label" :for="name">{{ label }}</label>
     <textarea
        @change="emitChange"
        :type="type"
        ref="input"
        class="sq-mngm-input--input form-control rounded-0"
        :class="classes"
        :name="name"
        v-model="state"
        :rows="5"
        :required="required"
      ></textarea>
  </div>
</template>

<script>
export default {
  name: "textAreaForm",
  data: function () {
    return {
      count: 0,
      state: "",
    }
  },
  created(){
    this.state = this.value;
  },
  methods: {
    emitChange() {
      this.$emit("inputChange", {'val': this.state, 'name': this.name});
    },
  },
  props: {
    label: String,
    name: String,
    value: [String, Number],
    classes: String,
    required: Boolean
  },
};
</script>
<style scoped>
.sq-mngm-input {
  margin-bottom: 15px;
  text-align: left;
}

.sq-mngm-input .sq-mngm-input--label {
  margin-bottom: 5px;
  
}

</style>
