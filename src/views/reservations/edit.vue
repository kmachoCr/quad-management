<template>
  <div v-if="loadedData" class="no-gutters">
    <div class="reservation-form">
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
                :value="minDate"
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
                :value="endDate"
                label="Fecha de fin"
                @inputChange="dateChange"
                :required="true"
              />
            </div>
          </div>
          <h4 class="mt-4 mb-3">2. Seleccione un cuadraciclo</h4>
          <div class="form-group row">
            <label for="inputEmail3" class="col-auto col-form-label"
              >Filtrar por n&uacute;mero de unidad:</label
            >
            <div class="col">
              <input
                v-model="keywordSquad"
                type="text"
                class="form-control"
                placeholder="Número de unidad"
              />
            </div>
          </div>
          <tableContent :columnNames="squadColumns">
            <template v-slot:table-content>
              <tr v-for="(item, index) in keyFilteredSquads" :key="index">
                <td>
                  <div class="custom-">
                    <input
                      :disabled="!minDate || !endDate"
                      type="checkbox"
                      ref="input"
                      v-model="selectedSquad"
                      :value="item"
                      :name="`code-squads[]`"
                      class="custom--input"
                    />
                  </div>
                </td>
                <td>{{ item.numUnit }}</td>
                <td>{{ item.id }}</td>
                <td>{{ item.brand }}</td>
                <td>{{ item.year }}</td>
              </tr>
            </template>
          </tableContent>
          
        </div>
        <div class="step-two">
          <h4 class="mt-4 mb-3">3. Seleccione un usuario</h4>
          <div class="form-group row">
            <label for="inputEmail3" class="col-auto col-form-label"
              >Filtrar por c&eacute;dula:</label
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
          <tableContent :columnNames="userColumns">
            <template v-slot:table-content>
              <tr v-for="(item, index) in keyFilteredUsers" :key="index">
                <td>
                  <div class="custom-">
                    <input
                      type="radio"
                      required
                      v-bind:value="`users/${item.code}`"
                      v-model="selectedUser"
                      name="code-users"
                      class="custom--input"
                    />
                  </div>
                </td>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.first_surname }} {{ item.second_surname }}</td>
              </tr>
            </template>
          </tableContent>
        </div>
        <alert :classes="alert.class" :isVisible="alert.status" :label="alert.label"/>
        <loadingModal :showModal="showLoadingModal"></loadingModal>
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
import input from "../../components/form-inputs/inputForm.vue";
import alert from '../../components/alert.vue';
import tableContent from '../../components/general/ReservationTable.vue';
import loadingModal from '../../components/loadingModal.vue';

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
          return el.numUnit.includes(key);
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
    this.getReservationInformation();
    this.getNeededData();
    const date = new Date().toISOString().slice(0, 10);
    this.today = date;
  },
  data: function () {
    return {
      showLoadingModal: false,
      userColumns: ['', 'Cedula', 'Nombre', 'Apellidos'],
      squadColumns: ['', 'Unidad', 'Placa', 'Marca', 'Modelo'],
      keywordSquad: "",
      keywordUser: "",
      datesSelected: false,
      minDate: null,
      endDate: null,
      loadedData: false,
      formState: {},
      formData: {},
      selectedSquad: [],
      rangeDays: [],
      squads: [],
      filteredSquads: [],
      users: [],
      alert: {
        status: false
      },
      reservation: null,
      selectedUser: null
    };
  },
  methods: {
    getReservationInformation() {
      this.$store.getters.database
        .collection("reservations")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            //this.formState = doc.data();
            console.log(doc.data());
            this.reservation = doc.data(); 
            this.reservation.code = doc.id; 
            this.minDate = doc.data().startDate;
            this.endDate = doc.data().endDate;
            doc.data().user.get().then((res) => {
              this.selectedUser = `users/${res.id}`;
            });
            
           
            this.dateChange();
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
    // getAvailable(isAvailable) {
    //   return isAvailable ? "Disponible" : "No Disponible";
    // },
    dateChange(data) {
      // debugger; eslint-disable-line no-debugger
      if (data && data.name === "startDate") {
        console.log(data.val);
        this.minDate = data.val;
      } else if (data) {
        this.endDate = data.val;
      }

      if (this.minDate && this.endDate) {
        this.rangeDays = this.getDaysArray(
          new Date(this.minDate),
          new Date(this.endDate)
        );

        this.filteredSquads = this.squads.filter((el) => {
          return (
            !(el.reserved ?? []).some(r => this.rangeDays.includes(r)) 
          );
        });
      }
      console.log(this.filteredSquads);
    },
    
    formSubmit() {
      this.showLoadingModal = true;
      this.alert.status = false;
      this.formData.user = this.$store.getters.database.doc(this.formData.user);
      this.formData.squad = this.selectedSquad.map(function (squad) {
        return squad.code;
      })
      this.formData.startDate = this.minDate;
      this.formData.endDate = this.endDate;

      this.$store.getters.database
        .collection("reservations")
        .doc(this.reservation.code)
        .update(this.formData)
        .then(() => {
            setTimeout(() => {
              this.showLoadingModal = false;
              this.alert.status = true;
              this.alert.class = "alert-success";
              this.alert.label = "La reservación fue guardada exitosamente.";
              window.location = '/reservations'
            }, 1500);
            
          })
          .catch(() => {
            this.alert.status = true;
            this.alert.class = "alert-warning";
            this.alert.label = "Hubo un error al guardar la reservación.";
          })

      this.selectedSquad.forEach(squad => {
        const newDatesRange = squad.reserved ? squad.reserved.concat(this.rangeDays) : this.rangeDays;
        this.$store.getters.database
          .collection("squads")
          .doc(squad.code)
          .update({ reserved: newDatesRange });
      });
      
      this.$refs.form.reset();
    },
    getSquadInformation: function () {
      // if status is true the squad is NOT available
      this.$store.getters.database
        .collection("squads")
        .where("status", "!=", false)
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
  watch: {
    selectedUser() {
      this.formData.user = this.selectedUser;
    }
  },
  components: {
    inputForm: input,
    alert,
    tableContent,
    loadingModal,
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