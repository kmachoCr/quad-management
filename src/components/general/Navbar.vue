<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/reservations">(Logo)</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"  v-if="isAuthenticated">
          <li class="nav-item">
            <router-link to="/reservations" class="nav-link"
              >Reservaciones</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/squads" class="nav-link"
              >Cuadraciclos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/users" class="nav-link">Personas</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <span class="nav-link"
                >Hola, {{ user.data && user.data.displayName }}</span
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="signOut">Cerrar sesión</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Inicio de sesión</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
      isAuthenticated: "isAuthenticated",
    }),
  },
  methods: {
    async signOut() {
      await firebase.auth().signOut();

      this.$router.replace({
        name: "login",
      });
    },
  },
};
</script>
<style>
li.nav-item {
  margin-right: 20px;
}
</style>