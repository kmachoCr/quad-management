<template>
  <div id="app">
    <div id="nav">
      <navbar></navbar>
    </div>
    <div class="sq-mngm-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <h1 class="mb-4">{{ this.$route.meta.title }}</h1>
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "./components/general/Navbar.vue";
export default {
  components: {
    navbar,
  },
};
</script>
<style>
.sq-mngm-btn {
  background-color: cadetblue;
  border-radius: 0;
  color: aliceblue;
  border: none;
  width: 100%;
  max-width: 200px;
  padding: 7px 15px;
  margin-left: 10px;
  text-align: center;
}

a {
  color: cadetblue;
}

a:hover {
  color: rgb(83, 141, 143);
}

.sq-mngm-btn:hover {
  text-decoration: none;
  color: aliceblue;
  background-color: rgb(83, 141, 143);
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.sq-mngm-content {
  padding: 50px 0;
}
</style>
