<template>
  <form-factory
    :formFields="fields"
    formAction="add"
    collection="users"
    :showAdminFields="true"
    :successMessage="'El usuario fue guardado exitosamente.'"
    :failureMessage="'Hubo un error al guardar el nuevo usuario.'"
  />
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
    for (let index = 15; index < 100; index++) {
      this.fields[5].options.push({
        value: index,
        label: index,
      });
    }
  },
  data: function () {
    return {
      formState: {},
      fields: [
        {
          class: "inputForm",
          label: "Cédula",
          name: "id",
          required: true,
        },
        {
          class: "inputForm",
          label: "Nombre",
          name: "name",
          required: true,
        },
        {
          class: "inputForm",
          label: "Primer apellido",
          name: "first_surname",
          required: true,
        },
        {
          class: "inputForm",
          label: "Segundo apellido",
          name: "second_surname",
          required: true,
        },
        {
          class: "inputForm",
          label: "Fecha de nacimiento",
          name: "birthday",
          type: "date",
          required: true,
        },
        {
          class: "dropdown",
          label: "Edad",
          name: "age",
          options: [],
          required: true,
        },
        {
          class: "textAreaForm",
          label: "Dirección",
          name: "address",
          required: true,
        },
        {
          class: "checkbox",
          label: "Es usuario administrador",
          name: "isAdmin",
        },
      ],
    };
  },
  methods: {

  },
};
</script>