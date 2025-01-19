<template>
  <div id="app">
    <nav>
      <router-link to="/" >Home</router-link>
      <router-link to="/admin" v-if="isAdminLoggedIn"
      >Admin Dashboard</router-link
      >
      <router-link to="/admin/login" v-if="!isAdminLoggedIn"
      >Admin Login</router-link
      >
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isAdminLoggedIn() {
      return !!localStorage.getItem('adminToken');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  padding: 20px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 15px;
}

nav a.router-link-exact-active {
  color: #007bff;
}
</style>