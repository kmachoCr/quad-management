<template>
    <table class="table mb-4">
        <thead class="">
            <tr>
                <th scope="col" class="border-0" v-for="(item, index) in columnNames" :key="index" >{{item}}</th>
            </tr>
        </thead>
        <tbody>
            <slot name="table-content"></slot>
        </tbody>
    </table>
</template>

<script>
/**
   * Modal window that get the user confirmation before execute some actions.
   * @displayName Confirmation Modal Component
   */
export default {
  name: "table-content",
  components: {},
  data: function () {
    return {
      
    };
  },
  props: {
    columnNames: {
        type: Array,
        default: () => []
    },
  },
};
</script>
<style scoped>
</style>