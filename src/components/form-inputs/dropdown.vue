<template>
  <div class="sq-mngm-select">
    <label for="customCheck1" class="sq-mngm-select--label">{{ label }}</label>
    <select
      @change="emitChange"
      v-model="state"
      :class="classes"
      :name="name"
      :placeholder="label"
      ref="input"
      class="custom-select"
      id="customCheck1"
    >
      <option
        :value="option.value"
        :key="index"
        v-for="(option, index) in options"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
 /**
   * Selector input component.
   * @displayName Selector Input
   */
export default {
  name: "dropdown",
  components: {},
  data: function () {
    return {
      count: 0,
      state: 0,
    };
  },
  created() {
    this.state = this.value;
  },
  methods: {
    /**
      * Gets called to emit the current value of input
      */
    emitChange() {
      this.$emit("inputChange", {
        val: this.state,
        name: this.name,
      });
    },
  },
  props: {
    label: String,
    name: String,
    value: [String, Number],
    rows: Number,
    classes: String,
    options: Array,
  },
};
</script>
<style scoped>
.sq-mngm-select {
  margin-bottom: 15px;
  text-align: left;
}

.sq-mngm-select .sq-mngm-select--label {
  margin-bottom: 5px;
}
</style>