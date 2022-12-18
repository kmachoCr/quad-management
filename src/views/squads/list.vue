<template>
  <div class="border-top pt-4">
    <div class="form-group row">
      <label for="inputEmail3" class="col-auto col-form-label"
        >Filtrar por N&uacute;mero de unidad:</label
      >
      <div class="col">
        <input
          v-model="keywordSquad"
          type="text"
          class="form-control"
          placeholder="Número de Unidad"
        />
      </div>
    </div>
    <table class="table mb-4">
      <thead class="">
        <tr>
          <th scope="col" class="border-0">N&uacute;mero de Unidad</th>
          <th scope="col" class="border-0">N&uacute;mero de Placa</th>  
          <th scope="col" class="border-0">Marca</th>
          <th scope="col" class="border-0">Color</th>
          <th scope="col" class="border-0">A&ntilde;o (Modelo)</th>
          <th scope="col" class="border-0">Estado</th>
          <th scope="col" class="border-0">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in keyFilteredSquads" :key="index">
          <td>
            <router-link
              :to="{ name: 'squadEdit', params: { id: item.code } }"
              class=""
              >{{ item.numUnit }}</router-link
            >
          </td>
          <td>{{ item.id }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.year }}</td>
          <td>
            <div :class="{ red: !item.status, green: item.status }"></div>
          </td>
          <td>
            <button @click.prevent="showModal(item.code)" class="btn btn-link">
              Borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <alert
      :classes="alert.class"
      :isVisible="alert.status"
      :label="alert.label"
    />
    <router-link :to="{ name: 'squadNew' }" class="sq-mngm-btn float-right"
      >Nuevo cuadraciclo</router-link
    >
    <modal
      :description="'Desea eliminar este cuadraciclo?'"
      :title="'Eliminar Cuadraciclo'"
      @emitConfirmation="emitConfirmation"
      :showModal="showConfirmationModal"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import modal from "./../../components/confirmationModal.vue";
import alert from "./../../components/alert.vue";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
    keyFilteredSquads() {
      if (this.keywordSquad.length > 2) {
        let key = this.keywordSquad;
        let keyFilteredSquads = this.squads.filter((el) => {
          return el.numUnit.includes(key);
        });

        return keyFilteredSquads;
      }
      return this.squads;
    },
  },
  components: {
    modal,
    alert,
  },
  mounted() {
    this.getSquadInformation();
  },
  data: function () {
    return {
      squads: [],
      keywordSquad: "",
      showConfirmationModal: false,
      itemToDelete: null,
      filteredSquads: [],
      alert: {
        status: false,
      },
    };
  },
  methods: {
    emitConfirmation(value) {
      if (value) {
        this.deleteData();
      }
      this.showConfirmationModal = false;
    },
    showModal(code) {
      this.itemToDelete = code;
      this.showConfirmationModal = true;
    },
    // getAvailable(isAvailable) {
    //   return isAvailable ? "Disponible" : "No Disponible";
    // },
    deleteData() {
      this.alert.status = true;
      this.$store.getters.database
        .collection("squads")
        .doc(this.itemToDelete)
        .delete()
        .then(() => {
          this.squads = this.squads.filter(
            (item) => item.code !== this.itemToDelete
          );
          this.itemToDelete = null;
          this.alert.status = true;
          this.alert.class = "alert-success";
          this.alert.label = "El cuadraciclo fue borrado exitosamente.";
        })
        .catch(() => {
          this.itemToDelete = null;
          this.alert.status = true;
          this.alert.class = "alert-warning";
          this.alert.label = "Hubo un error al borrar el cuadraciclo.";
        });
    },
    getSquadInformation: function () {
      this.$store.getters.database
        .collection("squads")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let newSquad = doc.data();
            newSquad.code = doc.id;
            this.squads.push(newSquad);
          });
        });
    },
  },
};
</script>
<style>
.table thead th {
  font-weight: 600;
}

.green {
  background-image: url("../../assets/check-64.png");
  background-repeat: no-repeat;
  height: 25px;
  width: 25px;
  background-size: contain;
}
.red {
  background-image: url("../../assets/cancel-64.png");
  background-repeat: no-repeat;
  height: 25px;
  width: 25px;
  background-size: contain;
}
</style>