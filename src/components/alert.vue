<template>
  <div
    class="alert"
    :class="classes"
    v-if="isVisible"
    role="alert"
  >
    {{ label }}
  </div>
</template>

<script>
/**
   * Element used to show messages or feedback to the user.
   * @displayName Alert Component
   */
export default {
  data() {
    return {
    };
  },
  props: {
    isVisible: Boolean,
    label: String,
    classes: String,
  },
};
</script>
