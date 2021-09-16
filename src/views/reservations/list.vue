<template>
  <div class="border-top pt-4">
    <table class="table mb-4">
      <thead class="">
        <tr>
          <th scope="col" class="border-0">Cédula</th>
          <th scope="col" class="border-0">Nombre</th>
          <th scope="col" class="border-0">Cuadraciclo</th>
          <th scope="col" class="border-0">Fechas</th>
          <th scope="col" class="border-0">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in reservations" :key="index">
          <td>{{ item.user ? item.user.id : "No info" }}</td>
          <td>
            {{
              item.user
                ? `${item.user.name} ${item.user.first_surname}`
                : "No info"
            }}
          </td>
          <td>{{ item.squad ? item.squad.id : "No info" }}</td>
          <td>{{ item.startDate }} - {{ item.endDate }}</td>
          <td>
            <button @click.prevent="showModal(item)" class="btn btn-link">
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
    <router-link
      :to="{ name: 'reservationNew' }"
      class="sq-mngm-btn float-right"
      >Nueva reservación</router-link
    >
    <modal
      :description="'Desea eliminar esta reservación?'"
      :title="'Eliminación de reservación'"
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
  },
  mounted() {
    this.getSquadInformation();
  },
  components: {
    modal,
    alert,
  },
  data: function () {
    return {
      reservations: [],
      showConfirmationModal: false,
      itemToDelete: null,
      squadToUpdate: null,
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
    showModal(item) {
      this.itemToDelete = item;
      this.squadToUpdate = item.squad;
      this.showConfirmationModal = true;
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
    async deleteData() {
      this.alert.status = true;
      const rangeDays = this.getDaysArray(
        new Date(this.itemToDelete.startDate),
        new Date(this.itemToDelete.endDate)
      );
      await this.$store.getters.database
        .collection("reservations")
        .doc(this.itemToDelete.code)
        .delete()
        .then(() => {
          this.reservations = this.reservations.filter(
            (item) => item.code !== this.itemToDelete.code
          );
          this.itemToDelete = null;
          this.alert.status = true;
          this.alert.class = "alert-success";
          this.alert.label = "La reservación fue borrada exitosamente.";
        })
        .catch(() => {
          this.itemToDelete = null;
          this.alert.status = true;
          this.alert.class = "alert-warning";
          this.alert.label = "Hubo un error al borrar la reservación.";
        });

      const newDatesRange = this.squadToUpdate.reserved.filter(
        (item) => !rangeDays.includes(item)
      );
      await this.$store.getters.database
        .collection("squads")
        .doc(this.squadToUpdate.code)
        .update({ reserved: newDatesRange });
    },
    getSquadInformation: function () {
      this.$store.getters.database
        .collection("reservations")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let newReservation = doc.data();
            newReservation.code = doc.id;
            if (newReservation.user) {
              newReservation.user.get().then((res) => {
                newReservation.user = res.data();
              });
            }

            if (newReservation.squad) {
              newReservation.squad.get().then((res) => {
                newReservation.squad = res.data();
                newReservation.squad
                  ? (newReservation.squad.code = res.id)
                  : null;
              });
            }

            this.reservations.push(newReservation);
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
</style>