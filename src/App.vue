<template>
  <div id="nav">
    <Navbar :isLoggedIn="isLoggedIn" :user="user" @handle-logout="handleLogout" />
  </div>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  async beforeCreate() {
    this.$store.dispatch("loadUser")
  },
  computed: {
    ...mapState(["isLoggedIn", "user"]),
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("logout")
      this.$router.push("/login")
    }
  },
}
</script>
