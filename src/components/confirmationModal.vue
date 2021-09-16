<template>
  <div id="app">
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{title}}</h5>
                
              </div>
              <div class="modal-body">
                <p>{{description}}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-sm rounded-0" @click="emitConfirmation(false)">Cancelar</button>
                <button type="button" class="btn btn-success btn-sm rounded-0" @click="emitConfirmation(true)">Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
/**
   * Modal window that get the user confirmation before execute some actions.
   * @displayName Confirmation Modal Component
   */
export default {
  name: "modal",
  components: {},
  data: function () {
    return {
      
    };
  },
  mounted() {
   
  },
  methods: {
        /**
      * Gets called to emit the decision from user
      */
    emitConfirmation(value) {
      this.$emit("emitConfirmation", value);
    },
  },
  props: {
    title: String,
    description: String,
    classes: String,
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
</style>