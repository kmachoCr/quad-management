<template>
  <div class="register">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form action="#" @submit.prevent="submit">
      <div class="form-group row">
        <label for="name" class="col-md-4 col-form-label text-md-right"
          >Nombre</label
        >

        <div class="col-md-6">
          <input
            id="name"
            type="name"
            class="form-control"
            name="name"
            value
            required
            autofocus
            v-model="form.name"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="email" class="col-md-4 col-form-label text-md-right"
          >Correo Electr&oacute;nico</label
        >

        <div class="col-md-6">
          <input
            id="email"
            type="email"
            class="form-control"
            name="email"
            value
            required
            autofocus
            v-model="form.email"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="password" class="col-md-4 col-form-label text-md-right"
          >Contrase&ntilde;a</label
        >

        <div class="col-md-6">
          <input
            id="password"
            type="password"
            class="form-control"
            name="password"
            required
            v-model="form.password"
          />
        </div>
      </div>

      <div class="form-group row mb-0">
        <div class="col-md-8 offset-md-4">
          <button type="submit" class="btn btn-primary">Registrar</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  mounted() {
    
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() => {});
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>