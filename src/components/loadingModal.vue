<template>
    <div v-if="showModal">
        <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="mx-auto text-center">
                        <div class="spinner-border text-light" role="status">
                            <span class="sr-only">Cargando...</span>
                        </div>
                        <p class="text-white">CARGANDO...</p>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
/**
   * Modal window that get the user confirmation before execute some actions.
   * @displayName Confirmation Modal Component
   */
export default {
  name: "loading-modal",
  components: {},
  data: function () {
    return {
      
    };
  },
  mounted() {
   
  },
  props: {
    showModal: Boolean,
  },
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-wrapper .spinner-border {
  width: 3rem; height: 3rem
}

</style>