<template>
  <div v-if="loadedData" class="no-gutters">
    <div class="reservation-form col-10">
      <hr />
      <form @submit.prevent="formSubmit" ref="form">
        <div class="step-one">
          <h4 class="mb-3">1. Seleccione una fecha</h4>
          <div class="reservation-form__dates">
            <div class="reservation-form__date-input">
              <inputForm
                type="date"
                ref="input"
                classes="pr-2"
                :min="today"
                name="startDate"
                label="Fecha de inicio"
                @inputChange="dateChange"
                :required="true"
              />
            </div>
            <div class="reservation-form__date-input">
              <inputForm
                type="date"
                ref="input"
                classes="pl-2"
                name="endDate"
                :min="minDate"
                label="Fecha de fin"
                @inputChange="dateChange"
                :required="true"
              />
            </div>
          </div>
          <h4 class="mt-4 mb-3">2. Seleccione un cuadraciclo</h4>
          <div class="form-group row">
            <label for="inputEmail3" class="col-auto col-form-label"
              >Filtrar por placa:</label
            >
            <div class="col">
              <input
                v-model="keywordSquad"
                type="text"
                class="form-control"
                placeholder="Palabra clave"
              />
            </div>
          </div>
          <table class="table mb-5">
            <thead class="">
              <tr>
                <th scope="col" class="border-0"></th>
                <th scope="col" class="border-0">Placa</th>
                <th scope="col" class="border-0">Marca</th>
                <th scope="col" class="border-0">Color</th>
                <th scope="col" class="border-0">Año</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in keyFilteredSquads" :key="index">
                <td>
                  <div class="custom-">
                    <input
                      :disabled="!minDate || !endDate"
                      type="radio"
                      ref="input"
                      v-model="selectedSquad"
                      :value="item"
                      name="code-squads"
                      class="custom--input"
                      required
                    />
                  </div>
                </td>
                <td>{{ item.id }}</td>
                <td>{{ item.brand }}</td>
                <td>{{ item.color }}</td>
                <td>{{ item.year }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="step-two">
          <h4 class="mt-4 mb-3">3. Seleccione un usuario</h4>
          <div class="form-group row">
            <label for="inputEmail3" class="col-auto col-form-label"
              >Filtrar por cédula:</label
            >
            <div class="col">
              <input
                type="text"
                v-model="keywordUser"
                class="form-control"
                placeholder="Palabra clave"
              />
            </div>
          </div>
          <table class="table mb-4">
            <thead class="">
              <tr>
                <th scope="col" class="border-0"></th>
                <th scope="col" class="border-0">Cedula</th>
                <th scope="col" class="border-0">Nombre</th>
                <th scope="col" class="border-0">Apellidos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in keyFilteredUsers" :key="index">
                <td>
                  <div class="custom-">
                    <input
                      type="radio"
                      required
                      :value="`users/${item.code}`"
                      v-model="formData.user"
                      name="code-users"
                      class="custom--input"
                    />
                  </div>
                </td>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.first_surname }} {{ item.second_surname }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <alert :classes="alert.class" :isVisible="alert.status" :label="alert.label"/>
        <input
          type="submit"
          class="sq-mngm-btn sq-mngm-form__button--submit mt-4"
          value="Enviar"
        />
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import input from "./../../components/form-inputs/inputForm.vue";
import alert from './../../components/alert.vue';

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
    keyFilteredSquads() {
      if (this.keywordSquad.length > 2) {
        let key = this.keywordSquad;
        let keyFilteredSquads = this.filteredSquads.filter((el) => {
          return el.id.includes(key);
        });

        return keyFilteredSquads;
      }
      return this.filteredSquads;
    },
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
    this.getNeededData();
    const date = new Date().toISOString().slice(0, 10);
    this.minDate = date;
    this.today = date;
  },
  data: function () {
    return {
      keywordSquad: "",
      keywordUser: "",
      datesSelected: false,
      minDate: null,
      endDate: null,
      loadedData: false,
      formState: {},
      formData: {},
      selectedSquad: null,
      rangeDays: [],
      squads: [],
      filteredSquads: [],
      users: [],
      alert: {
        status: false
      }
    };
  },
  methods: {
    getAvailable(isAvailable) {
      return isAvailable ? "Disponible" : "No Disponible";
    },
    dateChange(data) {
      // debugger; eslint-disable-line no-debugger
      if (data.name === "startDate") {
        console.log(data.val);
        this.minDate = data.val;
      } else {
        this.endDate = data.val;
      }

      if (this.minDate && this.endDate) {
        this.rangeDays = this.getDaysArray(
          new Date(this.minDate),
          new Date(this.endDate)
        );

        this.filteredSquads = this.squads.filter((el) => {
          return (
            !el.reserved.includes(this.minDate) &&
            !el.reserved.includes(this.endDate)
          );
        });
      }
    },
    formSubmit() {
      this.alert.status = false;
      this.formData.user = this.$store.getters.database.doc(this.formData.user);
      this.formData.squad = this.$store.getters.database.doc(
        `squads/${this.selectedSquad.code}`
      );
      this.formData.startDate = this.minDate;
      this.formData.endDate = this.endDate;

      this.$store.getters.database
        .collection("reservations")
        .add(this.formData);

      const newDatesRange = this.selectedSquad.reserved ? this.selectedSquad.reserved.concat(this.rangeDays) : this.rangeDays;
      this.$store.getters.database
        .collection("squads")
        .doc(this.selectedSquad.code)
        .update({ reserved: newDatesRange })
        .then(() => {
          this.alert.status = true;
          this.alert.class = "alert-success";
          this.alert.label = "La reservación fue guardada exitosamente.";
        })
        .catch(() => {
           this.alert.status = true;
          this.alert.class = "alert-warning";
          this.alert.label = "Hubo un error al guardar la reservación.";
        });
      this.$refs.form.reset();
    },
    getSquadInformation: function () {
      this.$store.getters.database
        .collection("squads")
        .where("status", "==", true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let newSquad = doc.data();
            newSquad.code = doc.id;
            this.squads.push(newSquad);
            this.filteredSquads.push(newSquad);
          });
        });
    },
    getUserInformation: function () {
      this.$store.getters.database
        .collection("users")
        .where("isAdmin", "!=", true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let newUser = doc.data();
            newUser.code = doc.id;
            this.users.push(newUser);
          });
        });
    },
    getDaysArray: function (start, end) {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt).toISOString().slice(0, 10));
      }
      return arr;
    },
    getNeededData: async function () {
      await this.getSquadInformation();
      await this.getUserInformation();
      this.loadedData = true;
    },
  },
  components: {
    inputForm: input,
    alert,
  },
};
</script>
<style>
.reservation-form__dates {
  display: flex;
}
.reservation-form__date-input {
  flex: 1;
}
</style>