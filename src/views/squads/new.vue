<template>
  <form-factory
    :formFields="fields"
    formAction="add"
    collection="squads"
    :successMessage="'El cuadraciclo fue guardado exitosamente.'"
    :failureMessage="'Hubo un error al guardar el cuadraciclo.'"
  />
</template>
<script>
import { mapGetters } from "vuex";
import FormFactory from "./../../components/form.vue";

export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  components: {
    FormFactory,
  },
  mounted() {
    let currentYear = new Date().getFullYear();
    for (let index = 0; index < 20; index++) {
      this.fields[3].options.push({
        value: currentYear - index,
        label: currentYear - index,
      });
    }
    this.squadBrands.forEach((element) => {
      this.fields[0].options.push({
        value: element,
        label: element,
      });
    });
  },
  data: function () {
    return {
      formState: {},
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
          class: "dropdown",
          label: "Marca",
          name: "brand",
          options: [],
          required: true,
        },
        {
          class: "inputForm",
          label: "Placa",
          name: "id",
          required: true,
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
          class: "checkbox",
          label: "Disponibilidad",
          name: "isAvailable",

          required: true,
        },
        {
          class: "checkbox",
          label: "Status",
          name: "status",
          required: true,
        },
      ],
    };
  },
  methods: {},
};
</script>