<template>
  <div class="border-1">
    <form-factory
      v-if="formState"
      :formFields="fields"
      :form-data="formState"
      collection="users"
      formAction="edit"
      :successMessage="'El usuario fue editado exitosamente.'"
      :failureMessage="'Hubo un error al editar el usuario.'"
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

    for (let index = 15; index < 100; index++) {
      this.fields[5].options.push({
        value: index,
        label: index,
      });
    }
  },
  data: function () {
    return {
      formState: null,
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
      ],
    };
  },
  methods: {
    getSquadInformation() {
      this.$store.getters.database
        .collection("users")
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