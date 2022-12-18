<template>
  <div class="border-top pt-4">
    <div class="form-group row">
      <label for="inputEmail3" class="col-auto col-form-label"
        >Filtrar por id:</label
      >
      <div class="col">
        <input
          type="text"
          v-model="keywordUser"
          class="form-control"
          placeholder="Número de Id"
        />
      </div>
    </div>
    <table class="table mb-4">
      <thead class="">
        <tr>
          <th scope="col" class="border-0">C&eacute;dula</th>
          <th scope="col" class="border-0">Nombre</th>
          <th scope="col" class="border-0">1er Apellido</th>
          <th scope="col" class="border-0">2do Apellido</th>
          <th scope="col" class="border-0">Fecha de nacimiento</th>
          <th scope="col" class="border-0">Edad</th>
          <th scope="col" class="border-0">Tipo</th>
          <th scope="col" class="border-0">Nacionalidad</th>
          <th scope="col" class="border-0">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in keyFilteredUsers" :key="index">
          <td>
            <router-link
              :to="{ name: 'userEdit', params: { id: item.code } }"
              class=""
              >{{ item.id }}</router-link
            >
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.first_surname }}</td>
          <td>{{ item.second_surname }}</td>
          <td>{{ item.birthday }}</td>
          <td>{{ item.age }} años</td>
          <td>{{ item.isAdmin === true ? 'Administrador' : 'Cliente' }}</td>
          <td>{{item.nationality}}</td>
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
    <router-link :to="{ name: 'userNew' }" class="sq-mngm-btn float-right"
      >Nuevo usuario</router-link
    >
    <modal
      :description="'Desea eliminar este usuario?'"
      :title="'Eliminar Usuario'"
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
    keyFilteredUsers() {
      if (this.keywordUser.length > 2) {
        let key = this.keywordUser;
        let keyFilteredUsers = this.users.filter((el) => {
          return el.id.includes(key);
        });

        return keyFilteredUsers;
      }
      return this.users;
    },
  },
  mounted() {
    this.getUserInformation();
  },
  components: {
    modal,
    alert,
  },
  data: function () {
    return {
      users: [],
      keywordUser: "",
      showConfirmationModal: false,
      itemToDelete: null,
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
    deleteData() {
      this.alert.status = true;
      this.$store.getters.database
        .collection("users")
        .doc(this.itemToDelete)
        .delete()
        .then(() => {
          this.users = this.users.filter(
            (item) => item.code !== this.itemToDelete
          );
          this.itemToDelete = null;
          this.alert.status = true;
          this.alert.class = "alert-success";
          this.alert.label = "El usuario fue borrado exitosamente.";
        })
        .catch(() => {
          this.itemToDelete = null;
          this.alert.status = true;
          this.alert.class = "alert-warning";
          this.alert.label = "Hubo un error al borrar el usuario.";
        });
    },
    // getAvailable(isAvailable) {
    //   return isAvailable ? "Disponible" : "No Disponible";
    // },
    getUserInformation: function () {
      this.$store.getters.database
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let newUser = doc.data();
            newUser.code = doc.id;
            this.users.push(newUser);
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