<template>
  <div class="sq-mngm-input custom-form-input" :class="classes">
    <label class="sq-mngm-input--label" :for="name">{{ label }}</label>
     <input
        @change="emitChange"
        :type="type"
        ref="input"
        class="sq-mngm-input--input form-control rounded-0"
        :min="min"
        :max="max"
        :name="name"
        v-model="state"
        :required="required"
      />
  </div>
</template>

<script>
export default {
  name: "inputText",
  components: {},
  data: function () {
    return {
      count: 0,
      state: "",
    }
  },
  created(){
    this.state = this.value;
  },
  watch: {
    value() {
      this.state = this.value;
    }
  },
  methods: {
    emitChange() {
      this.$emit("inputChange", {'val': this.state, 'name': this.name});
    },
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    
    label: String,
    min: String,
    max: String,
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
