<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Product Manager</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav ms-auto">
          <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" :to="{ name: 'AddProduct' }">Add New Product</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{ user.name }}</a>
            <div class="dropdown-menu">
              <a @click.prevent="handleLogout" class="dropdown-item" href="#">Logout</a>
            </div>
          </li>
          </template>
          <template v-if="!this.$store.state.isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" :to="{ name: 'Register' }">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" :to="{ name: 'Login' }">Login</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ['isLoggedIn', 'user'],
  methods: {
    handleLogout() {
      this.$emit("handle-logout")
    }
  },
}
</script>