<template>
  <div class="border-1">
    <form-factory
      v-if="formState"
      :formFields="fields"
      :form-data="formState"
      collection="squads"
      formAction="edit"
      :successMessage="'El cuadraciclo fue editado exitosamente.'"
      :failureMessage="'Hubo un error al editar el cuadraciclo.'"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import FormFactory from "./../../components/form.vue";

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  components: {
    FormFactory,
  },
  mounted() {
    this.getSquadInformation();

    let currentYear = new Date().getFullYear();
    for (let index = 0; index < 20; index++) {
      this.fields[4].options.push({
        value: currentYear - index,
        label: currentYear - index,
      });
    }
    this.squadBrands.forEach((element) => {
      this.fields[2].options.push({
        value: element,
        label: element,
      });
    });
  },
  data: function () {
    return {
      formState: null,
      squadBrands: [
        "Can-Am",
        "CFMoto",
        "Honda",
        "Kawasaki",
        "KTM",
        "Kymco",
        "Polaris",
        "Serpento",
        "Suzuki",
        "Yamaha",
      ],
      fields: [
        {
          class: "inputForm",
          label: "Número de Unidad",
          name: "numUnit",
          required: true,
        },
        {
          class: "inputForm",
          label: "Número de Placa",
          name: "id",
          required: true,
        },
        {
          class: "dropdown",
          label: "Marca",
          name: "brand",
          required: true,
          options: [],
        },
        {
          class: "inputForm",
          label: "Color",
          name: "color",
          required: true,
        },
        {
          class: "dropdown",
          label: "Año (Modelo)",
          name: "year",
          options: [],
          required: true,
        },
        {
          class: "inputForm",
          label: "CC",
          name: "cc",
          required: true,
        },
        // {
        //   class: "checkbox",
        //   label: "Disponibilidad",
        //   name: "isAvailable",
        //   required: true,
        // },
        {
          class: "checkbox",
          label: "Unidad disponible",
          name: "status",
          required: true,
        }
      ],
    };
  },
  methods: {
    getSquadInformation() {
      this.$store.getters.database
        .collection("squads")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.formState = doc.data();
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
  },
};
</script>