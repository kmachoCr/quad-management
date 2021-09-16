<template>
  <div class="sq-mngm-checkbox">
    <div class="custom-control custom-checkbox">
      <input
        @change="emitChange"
        type="checkbox"
        v-model="state"
        value="checked"
        :class="classes"
        :name="name"
        ref="input"
        class="custom-control-input"
        :id="`checkbox${name}`"
      />
      <label class="custom-control-label" :for="`checkbox${name}`">{{ label }}</label>
    </div>
  </div>
</template>

<script>
 /**
   * Checkbox input component.
   * @displayName Checkbox Input
   */
export default {
  name: "checkbox",
  components: {},
  data: function () {
    return {
      count: 0,
      state: [],
    };
  },
  created() {
    this.isChecked && this.state.push("checked");
  },
  methods: {
    /**
      * Gets called to emit the current value of input
      */
    emitChange() {
      this.$emit("inputChange", {
        val: this.state.length > 0,
        name: this.name,
      });
    },
  },
  props: {
    label: String,
    name: String,
    isChecked: Boolean,
    classes: String,
  },
};
</script>
<style scoped>
.sq-mngm-checkbox {
  margin-bottom: 7px;
  text-align: left;
}

</style>